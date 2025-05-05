"use client";

import { Calendar, Edit, Loader, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { OfferFormSchema } from "@/@types";
import { addOffer, deleteOffer, getOffers, updateOffer } from "@/actions/offer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Offer } from "../../../../../prisma/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { DateFormat } from "@/lib/utils";

export default function OffersPage() {
  const [items, setItems] = useState<Offer[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      const data = await getOffers();
      setItems(data);
    });
  }, []);

  const form = useForm<z.infer<typeof OfferFormSchema>>({
    resolver: zodResolver(OfferFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      startDate: "",
      endDate: "",
    },
  });

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function onAddSubmit(values: z.infer<typeof OfferFormSchema>) {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value as string);
    });

    await addOffer(formData)
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

  async function onEditSubmit(values: z.infer<typeof OfferFormSchema>) {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("id", currentId as string);
    await updateOffer(formData)
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
      startDate: item.startDate.toISOString(),
      endDate: item.endDate.toISOString(),
    });
    setIsEditDialogOpen(true);
  }

  async function handleConfirmDelete() {
    const formData = new FormData();
    formData.append("id", currentId as string);
    setIsDeleting(true);
    await deleteOffer(formData)
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
        <h1 className="text-3xl font-bold tracking-tight">
          Offers & Promotions
        </h1>
        <p className="text-muted-foreground">
          Manage your restaurant&apos;s special offers and promotions.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search offers..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Offer</DialogTitle>
              <DialogDescription>
                Create a new special offer or promotion.
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
                        <Input placeholder="Happy Hour Special" {...field} />
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
                          placeholder="Describe the offer..."
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
                          endPoint="offerImage"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
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
                      "Add Offer"
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
          filteredItems.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="cursor-pointer"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <Image
                    width={350}
                    height={200}
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className=" rounded-md object-cover"
                  />
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {DateFormat(item.startDate)} to{" "}
                    {DateFormat(item.endDate)}
                  </span>
                </div>
              </CardFooter>
            </Card>
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
            <DialogTitle>Edit Offer</DialogTitle>
            <DialogDescription>Make changes to the offer.</DialogDescription>
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
                        endPoint="offerImage"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
