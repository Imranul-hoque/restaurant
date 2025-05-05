"use client";

import { MenuFormSchema } from "@/@types";
import { addMenu, deleteMenu, getMenus, updateMenu } from "@/actions/menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/upload-image";
import { MenuItem } from "../../../../../prisma/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader, Plus, Search, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";



export default function MenuPage() {

  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      const data = await getMenus();
      setItems(data);
    })
  }, [])

  const form = useForm<z.infer<typeof MenuFormSchema>>({
    resolver: zodResolver(MenuFormSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function onAddSubmit(values: z.infer<typeof MenuFormSchema>) {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value as string);
    });

    await addMenu(formData)
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

  async function onEditSubmit(values: z.infer<typeof MenuFormSchema>) {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("id", currentId as string);
    await updateMenu(formData)
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

  async function handleConfirmDelete() {
    const formData = new FormData();
    formData.append("id", currentId as string);
    setIsDeleting(true);
    await deleteMenu(formData)
      .then((res: { message: any }) => {
        setIsDeleting(false);
       window.location.reload();
       setIsDeleteDialogOpen(false);
       toast.success(res.message);
      }).catch((error) => {
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
        toast.error(error)
    })
  }

  function handleEdit(item: (typeof items)[0]) {
    form.reset({
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setIsEditDialogOpen(true);
    setCurrentId(item.id);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Menu Items</h1>
        <p className="text-muted-foreground">
          Manage your restaurant&apos;s menu items here.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search menu items..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="cursor-pointer">
                Add Menu Item
              </DialogTitle>
              <DialogDescription>
                Add a new item to your restaurant menu.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onAddSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Classic Burger" {...field} />
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
                          placeholder="Describe the menu item..."
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
                          endPoint="menuImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Appetizer">Appetizer</SelectItem>
                            <SelectItem value="Main Course">
                              Main Course
                            </SelectItem>
                            <SelectItem value="Dessert">Dessert</SelectItem>
                            <SelectItem value="Beverage">Beverage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="cursor-pointer">
                    {form.formState.isSubmitting ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      "Add Item"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {item.category}
                  </CardDescription>
                </div>
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
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
            </CardFooter>
          </Card>
        ))}
        {isPending && (
          <div className="w-[75vw] h-[40vh] flex items-center justify-center">
            <Loader className="animate-spin size-6" />
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Make changes to the menu item.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                        endPoint="menuImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Appetizer">Appetizer</SelectItem>
                          <SelectItem value="Main Course">
                            Main Course
                          </SelectItem>
                          <SelectItem value="Dessert">Dessert</SelectItem>
                          <SelectItem value="Beverage">Beverage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button className="cursor-pointer" type="submit">
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
