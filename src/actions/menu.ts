"use server";

import { MenuFormSchema, UpdateMenuFormSchema } from "@/@types";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { revalidatePath } from "next/cache";

export async function addMenu(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = MenuFormSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;

    await db.menuItem.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            image: data.image,
            userId: user.id
        }
    });

    revalidatePath("/dashboard/menu")
    return { message: "Menu added successfully" }
}
export async function updateMenu(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = UpdateMenuFormSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;

    await db.menuItem.update({
        where: {
          id : data.id  
        },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            image: data.image,
            userId: user.id
        }
    });

    revalidatePath("/dashboard/menu")
    return { message: "Menu updated successfully" }
}

export async function deleteMenu(formData : FormData) {
    const id = formData.get("id");
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
      throw new Error("Unauthorized");
    }
   if (!id || typeof id !== "string") {
     throw new Error("Invalid or missing ID");
   }

    await db.menuItem.delete({
        where: {
            id: id
        }
    });

     revalidatePath("/dashboard/menu");
     return { message: "Menu delete successfully" };
}

export async function getMenus() {
    const data = await db.menuItem.findMany({
        orderBy: {
            createdAt : "desc"
        }
    })
    return data
}


export async function getTotalItems() {
    const items = await db.menuItem.count();
    return items;
}