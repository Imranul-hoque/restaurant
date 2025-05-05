import { z } from "zod";
import { Prisma } from "@prisma/client";

export const MenuFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  image : z.string().min(2,{ message : "Select image for menu" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  category: z.string({ required_error: "Please select a category" }),
});

export const UpdateMenuFormSchema = MenuFormSchema.extend({
    id: z.string().min(2, { message: "Id is required" })
})

export const OfferFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  image : z.string().min(2, { message : "Image is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
});

export const UpdateOfferFormSchema = OfferFormSchema.extend({
  id : z.string().min(2, { message : "Id is required" })
})

export const ReservationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number should be at least 10 characters" }),
  date: z.coerce.date({ message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  guests: z.coerce.number().int().positive(),
  occasion: z.string().min(2, { message: "Occasion field is required" }),
  specialRequests: z.string().optional(),
});


export const EventFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title is required and must be at least 2 characters.",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  date: z.string({ message: "Invalid date format." }),
  time: z.string().min(3, { message: "Time is required." }),
  location: z.string().min(2, { message: "Location is required." }),
  image: z.string().url({ message: "Image must be a valid URL or file path." }),
  price: z.string().min(1, { message: "Price is required." }),
});

export const UpdateEventSchema = EventFormSchema.extend({
  id : z.string().min(2, { message : "Id is required" })
})

const orderWithRelations = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    items: true,
    user: true,
  },
});

const reservationWithRelation = Prisma.validator<Prisma.ReservationDefaultArgs>()({
  include: {
    user : true
  }
})

export type OrderWithItemsAndUser = Prisma.OrderGetPayload<
  typeof orderWithRelations
>;
export type ReservationWithUser = Prisma.ReservationGetPayload<
  typeof reservationWithRelation
>;