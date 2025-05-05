"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Edit,
  Loader,
  MapPin,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { EventFormSchema } from "@/@types";
import { addEvent, deleteEvent, getEvents, updateEvent } from "@/actions/event";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/upload-image";
import { Event } from "@/generated/prisma";
import { DateFormat } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function EventPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      const data = await getEvents();
      setItems(data);
    });
  }, []);

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      image: "",
      price: "",
    },
  });

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function onAddSubmit(values: z.infer<typeof EventFormSchema>) {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value as string);
    });

    await addEvent(formData)
      .then((res: { message: any }) => {
        form.reset();
        window.location.reload();
        setIsAddDialogOpen(false);
        toast.success(res.message);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async function onEditSubmit(values: z.infer<typeof EventFormSchema>) {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("id", currentId as string);
    await updateEvent(formData)
      .then((res: { message: any }) => {
        form.reset();
        window.location.reload();
        setIsEditDialogOpen(false);
        toast.success(res.message);
      })
      .catch((error: any) => {
        console.log(error);
        setIsEditDialogOpen(false);
      });
  }

  function handleDelete(id: string) {
    setIsDeleteDialogOpen(true);
    setCurrentId(id);
  }

  function handleEdit(item: (typeof items)[0]) {
    setCurrentId(item.id);

    form.reset({
      title: item.title,
      description: item.description,
      image: item.image,
      location: item.location,
      date: String(item.date),
      time: item.time,
      price: item.price,
    });
    setIsEditDialogOpen(true);
  }

  async function handleConfirmDelete() {
    const formData = new FormData();
    formData.append("id", currentId as string);
    setIsDeleting(true);
    await deleteEvent(formData)
      .then((res: { message: any }) => {
        setIsDeleting(false);
        window.location.reload();
        setIsDeleteDialogOpen(false);
        toast.success(res.message);
      })
      .catch((error) => {
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
        toast.error(error);
      });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
        <p className="text-muted-foreground">
          Manage your restaurant&apos;s special Events
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Events
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Events</DialogTitle>
              <DialogDescription>
                Create a new special Events.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onAddSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="'Testing events'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the event..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="$10.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Image</FormLabel>
                      <FormControl>
                        <UploadImage
                          value={field.value}
                          onChange={field.onChange}
                          endPoint="eventImage"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="7:00 PM - 9:30 PM"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {form.formState.isSubmitting ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      "Add Event"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <p className="text-center text-muted-foreground">
                No offers found.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111111] rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64 group">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="hidden group-hover:flex gap-1 absolute top-0 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(event)}
                    className="cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Calendar size={18} className="mr-2 text-[#FFD700]" />
                    <span>{DateFormat(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock size={18} className="mr-2 text-[#FFD700]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={18} className="mr-2 text-[#FFD700]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-[#FFD700] font-semibold pt-1">
                    ${event.price} Per Person
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {isPending && (
          <div className="w-[75vw] h-[40vh] flex items-center justify-center">
            <Loader className="animate-spin size-6" />
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Make changes to the Event.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Image</FormLabel>
                    <FormControl>
                      <UploadImage
                        value={field.value}
                        onChange={field.onChange}
                        endPoint="eventImage"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="'$10.99'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter you location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              After delete this action can not be undone!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-x-4 justify-end">
            <Button variant={"outline"}>Cancel</Button>
            <Button onClick={handleConfirmDelete} variant={"destructive"}>
              {isDeleting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
