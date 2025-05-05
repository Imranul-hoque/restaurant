"use server";

import { EventFormSchema, UpdateEventSchema } from "@/@types";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { revalidatePath } from "next/cache";

export async function addEvent(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = EventFormSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;

    const parsedDate = new Date(data.date);

    await db.event.create({
        data: {
            title: data.title,
            image: data.image,
            description: data.description,
            price: data.price,
            location: data.location,
            date: parsedDate,
            time: data.time,
        }
    });

    revalidatePath("/dashboard/offer")
    return { message: "Event added successfully" }
}
export async function updateEvent(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = UpdateEventSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;
    const parsedDate = new Date(data.date);

    await db.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
          location: data.location,
          price: data.price,
          date: parsedDate,
        time : data.time
      },
    });

    revalidatePath("/dashboard/events")
    return { message: "Event updated successfully" }
}

export async function deleteEvent(formData : FormData) {
    const id = formData.get("id");
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
      throw new Error("Unauthorized");
    }
   if (!id || typeof id !== "string") {
     throw new Error("Invalid or missing ID");
   }

    await db.event.delete({
        where: {
            id: id
        }
    });

     revalidatePath("/dashboard/events");
     return { message: "event deleted successfully" };
}

export async function getEvents() {
    const data = await db.event.findMany({
        orderBy: {
            createdAt : "desc"
        }
    })
    return data
}