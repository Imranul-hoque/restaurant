import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getUser } from "@/actions/user";



export async function POST(req: NextRequest) {
    const { items } = await req.json();
  const user = await currentUser();
  const currUser = await getUser(user!.emailAddresses[0].emailAddress);
    if (!currUser!.id) return new NextResponse("Unauthorized", { status: 401 });
 
     const menuItems = await db.menuItem.findMany({
       where: {
         id: { in: items.map((item: any) => item.id) },
       },
     });
    
    const total = menuItems.reduce((sum, item) => {
      const quantity = items.find((i: any) => i.id === item.id)?.quantity || 1;
      return sum + item.price * quantity;
    }, 0);

    const order = await db.order.create({
      data: {
        userId : currUser!.id,
        total,
        date: new Date(),
        status: "Pending",
        items: {
          connect: items.map((item: any) => ({ id: item.id })),
        },
      },
    });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: menuItems.map((item) => {
          const quantity =
            items.find((i: any) => i.id === item.id)?.quantity || 1;
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity,
          };
        }),
        mode: "payment",
        metadata: {
          orderId: order.id,
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      });
    
    return NextResponse.json({ url: session.url });

}