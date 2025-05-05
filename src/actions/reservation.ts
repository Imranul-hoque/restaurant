"use server"

import { ReservationSchema, ReservationWithUser } from "@/@types";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addReservation(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = ReservationSchema.safeParse(values);
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
        throw new Error("Unauthorized")
    }
    if (!parsed.success) {
        throw new Error("Invalid form data");
    }
    const data = parsed.data;

    await db.reservation.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            guests: data.guests,
            date: data.date,
            time: data.time,
            occasion: data.occasion,
            specialRequests: data.specialRequests,
            userId : user.id
        }
    });

    revalidatePath("/reservation")
    return { message: "Menu added successfully" }
}

export async function getReservations(): Promise<ReservationWithUser[]> {
    const currUser = await currentUser();
    const user = await getUser(currUser!.emailAddresses[0].emailAddress);
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const reservations = await db.reservation.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return reservations
}