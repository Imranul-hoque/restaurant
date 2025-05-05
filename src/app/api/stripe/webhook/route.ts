import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export const config = {
    api: {
        bodyParser: false
    }
}

export async function POST(req : NextRequest) {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
     if (!signature) {
       return new NextResponse("Missing Stripe signature", { status: 400 });
    }
    
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error : any) {
        console.error("❌ Webhook error:", error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, {
          status: 400,
        });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
            await db.order.update({
                where: {
                    id : orderId
                },
                data: {
                    status : "Completed"
                }
            })
        }
    }

    return NextResponse.json({ received: true });

}