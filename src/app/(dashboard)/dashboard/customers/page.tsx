"use client";

import { useState } from "react";
import { Mail, Phone, Search, Trash, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const customers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    orders: 12,
    lastOrder: "2023-05-10",
    totalSpent: "$345.60",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 987-6543",
    orders: 8,
    lastOrder: "2023-05-08",
    totalSpent: "$230.75",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 456-7890",
    orders: 15,
    lastOrder: "2023-05-12",
    totalSpent: "$478.25",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(555) 234-5678",
    orders: 5,
    lastOrder: "2023-05-05",
    totalSpent: "$124.99",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "(555) 876-5432",
    orders: 10,
    lastOrder: "2023-05-11",
    totalSpent: "$356.20",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "(555) 345-6789",
    orders: 7,
    lastOrder: "2023-05-07",
    totalSpent: "$198.75",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "(555) 567-8901",
    orders: 9,
    lastOrder: "2023-05-09",
    totalSpent: "$287.30",
  },
  {
    id: "8",
    name: "Lisa Garcia",
    email: "lisa.garcia@example.com",
    phone: "(555) 678-9012",
    orders: 3,
    lastOrder: "2023-05-03",
    totalSpent: "$98.50",
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customersList, setCustomersList] = useState(customers);
  const { toast } = useToast();

  const filteredCustomers = customersList.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  function deleteCustomer(customerId: string) {
    setCustomersList(
      customersList.filter((customer) => customer.id !== customerId)
    );

    toast({
      title: "Customer deleted",
      description: "The customer has been removed from the system",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your restaurant&apos;s customer database.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <p className="text-center text-muted-foreground">
                No customers found.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCustomers.map((customer) => (
            <Card key={customer.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <UserRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{customer.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {customer.orders} orders • {customer.totalSpent}
                      </CardDescription>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this customer? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCustomer(customer.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="pt-2 text-xs text-muted-foreground">
                    Last order: {customer.lastOrder}
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
