import { db } from "@/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { type, data } = evt;
    
    if (type === "user.created") {
      await db.user.create({
        data: {
          email: data.email_addresses[0].email_address,
          username: data.username!,
          role: "CUSTOMER"
        },
      });
    }

    return NextResponse.json({ message: "webhook recieved" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
