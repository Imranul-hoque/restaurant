import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs/server";
import { getTotalUser, getUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { getOrders, getTotalOrders, getTotalRevenue } from "@/actions/orders";
import { getTotalItems } from "@/actions/menu";
import { DateFormat } from "@/lib/utils";
import { getReservations } from "@/actions/reservation";

export default async function DashboardPage() {

  const revenue = await getTotalRevenue();
  const totalOrders = await getTotalOrders();
  const items = await getTotalItems();
  const users = await getTotalUser();
  const orders = await getOrders();
  const reservations = await getReservations();

  const data = await currentUser();
  const user = await getUser(data!.emailAddresses[0].emailAddress);
  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your restaurant.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenue._sum.total}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{users}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items}</div>
            <p className="text-xs text-muted-foreground">
              +2 new items this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-orders" className="w-full">
        <TabsList>
          <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="reservations">Upcoming Reservations</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-orders" className="border rounded-md mt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 text-sm">{order.id}</td>
                    <td className="px-4 py-3 text-sm">{order.user.username}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Processing"
                            ? "default"
                            : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">${order.total}</td>
                    <td className="px-4 py-3 text-sm">{DateFormat(order.date)}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end p-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/orders">
                View all orders
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="reservations" className="border rounded-md mt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Reservation ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Guests
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Occasion
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Date & Time
                  </th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 text-sm">{reservation.id}</td>
                    <td className="px-4 py-3 text-sm">
                      {reservation.user.username}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {reservation.user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">{reservation.guests}</td>
                    <td className="px-4 py-3 text-sm">{reservation.occasion}</td>
                    <td className="px-4 py-3 text-sm">
                      {DateFormat(reservation.date)}
                    </td>
                   
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end p-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/reservations">
                View all reservations
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
