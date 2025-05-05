"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { OrderStatus, Prisma } from "@/generated/prisma";
import { OrderWithItemsAndUser } from "@/@types";
import { revalidatePath } from "next/cache";


export async function getOrders(): Promise<OrderWithItemsAndUser[]> {
  const user = await currentUser();
  const currUser = await getUser(user!.emailAddresses[0].emailAddress);

  if (!currUser) {
    throw new Error("Unauthorized");
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
      user: true,
    },
  });

  return orders;
}


export async function updateOrder(formdata: FormData) {
  const user = await currentUser();
  const currUser = await getUser(user!.emailAddresses[0].emailAddress);
  const orderId = formdata.get("orderId") as string;
  const status = formdata.get("status") as OrderStatus;

  if (!orderId || !status) {
    throw new Error("All fields are required");
  }

  if (!currUser) {
    throw new Error("Unauthorized");
  }

  await db.order.update({
    where: {
      id: orderId
    },
    data: {
      status: status
    }
  });

  revalidatePath("/dashboard/orders")
  return { message : "Order updated successfully" }
  
}

export async function getTotalRevenue() {
  const revenue = await db.order.aggregate({
    _sum: {
      total: true
    }
  });

  return revenue
}

export async function getTotalOrders() {
  const orders = await db.order.count();
  return orders;
}