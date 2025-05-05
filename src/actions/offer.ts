"use server";

import { OfferFormSchema, UpdateOfferFormSchema } from "@/@types";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { revalidatePath } from "next/cache";

export async function addOffer(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = OfferFormSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;

    const parsedStartDate = new Date(data.startDate);
    const parsedEndDate = new Date(data.endDate);

    await db.offer.create({
        data: {
            title: data.title,
            image: data.image,
            description: data.description,
            startDate: parsedStartDate,
            endDate : parsedEndDate
        }
    });

    revalidatePath("/dashboard/offers")
    return { message: "Offer added successfully" }
}
export async function updateOffer(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = UpdateOfferFormSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;
    const parsedStartDate = new Date(data.startDate);
    const parsedEndDate = new Date(data.endDate);

    await db.offer.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      },
    });

    revalidatePath("/dashboard/offers")
    return { message: "Offer updated successfully" }
}

export async function deleteOffer(formData : FormData) {
    const id = formData.get("id");
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
      throw new Error("Unauthorized");
    }
   if (!id || typeof id !== "string") {
     throw new Error("Invalid or missing ID");
   }

    await db.offer.delete({
        where: {
            id: id
        }
    });

     revalidatePath("/dashboard/offers");
     return { message: "Offer delete successfully" };
}

export async function getOffers() {
    const data = await db.offer.findMany({
        orderBy: {
            createdAt : "desc"
        }
    })
    return data
}