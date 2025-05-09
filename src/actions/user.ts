"use server";

import { db } from "@/lib/db";

export const getUser = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        }
    })
    return user 
}

export async function getTotalUser() {
    const users = await db.user.count({
        where: {
            role: {
                not: "ADMIN"
            }
        }
    });

    return users;
}