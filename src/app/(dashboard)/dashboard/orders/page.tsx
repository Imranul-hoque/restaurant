"use client";

import { ArrowRight, Check, Clock, Loader, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { OrderWithItemsAndUser } from "@/@types";
import { getOrders, updateOrder } from "@/actions/orders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/generated/prisma";
import { DateFormat } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ordersList, setOrdersList] = useState<OrderWithItemsAndUser[]>();
  const [isPending, startTransition] = useTransition();

  const filteredOrders = ordersList?.filter(
    (order) =>
      (statusFilter === "All" || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const formData = new FormData();

    formData.append('orderId', orderId);
    formData.append('status', status);

    await updateOrder(formData)
      .then((res: { message: any }) => {
        toast.message(res.message);
        window.location.reload();
      }).catch((error : any) => {
        toast.error(error.message);
    })

  };

  useEffect(() => {
    startTransition(async () => {
      const data = await getOrders();
      setOrdersList(data);
    });
  }, []);

  if (isPending) {
    return (
      <div className="w-[80vw] h-[70vh] flex items-center justify-center">
        <Loader className="size-5 animate-spin"  />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track customer orders.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            defaultValue="All"
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Orders</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <p className="text-center text-muted-foreground">
                No orders found.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders?.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {order.id}
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Processing"
                            ? "default"
                            : order.status === "Cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {DateFormat(order.date)} • {order.user.username}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Change status to</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "Pending")
                            }
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Pending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "Processing")
                            }
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Processing</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "Completed")
                            }
                          >
                            <Check className="mr-2 h-4 w-4" />
                            <span>Completed</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "Cancelled")
                            }
                          >
                            <X className="mr-2 h-4 w-4" />
                            <span>Cancelled</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">View order</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <h3 className="text-sm font-medium">Order Items</h3>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <li>{item.name}</li>
                          <li>{item.description}</li>
                          <li className="text-white font-bold">{item.category}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Order Image</h3>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <Image
                            width={100}
                            height={100}
                            alt={item.name}
                            src={item.image}
                            className={"rounded-md shadow-xl"}
                          />
                        </div>
                      ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Customer Details</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>{order.user.username}</p>
                      <p>{order.user.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Order Summary</h3>
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-medium">${order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
