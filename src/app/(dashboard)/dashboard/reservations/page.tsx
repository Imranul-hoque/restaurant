"use client";

import { useState } from "react";
import { Calendar, Check, Clock, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { reservations } from "@/constant";



export default function ReservationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reservationsList, setReservationsList] = useState(reservations);
  const { toast } = useToast();

  const filteredReservations = reservationsList.filter(
    (reservation) =>
      (statusFilter === "All" || reservation.status === statusFilter) &&
      (reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.customer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  function updateReservationStatus(reservationId: string, newStatus: string) {
    const updatedReservations = reservationsList.map((reservation) =>
      reservation.id === reservationId
        ? { ...reservation, status: newStatus }
        : reservation
    );
    setReservationsList(updatedReservations);

    toast({
      title: "Reservation status updated",
      description: `Reservation ${reservationId} is now ${newStatus}`,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <p className="text-muted-foreground">
          Manage and track customer reservations.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reservations..."
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
              <SelectItem value="All">All Reservations</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredReservations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <p className="text-center text-muted-foreground">
                No reservations found.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredReservations.map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {reservation.id}
                      <Badge
                        variant={
                          reservation.status === "Confirmed"
                            ? "success"
                            : reservation.status === "Cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {reservation.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {reservation.date} at {reservation.time} •{" "}
                      {reservation.customer}
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
                              updateReservationStatus(reservation.id, "Pending")
                            }
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Pending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateReservationStatus(
                                reservation.id,
                                "Confirmed"
                              )
                            }
                          >
                            <Check className="mr-2 h-4 w-4" />
                            <span>Confirmed</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateReservationStatus(
                                reservation.id,
                                "Cancelled"
                              )
                            }
                          >
                            <X className="mr-2 h-4 w-4" />
                            <span>Cancelled</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-medium">Reservation Details</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {reservation.date} at {reservation.time}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span>Party size: {reservation.guests} guests</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Customer Details</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>{reservation.customer}</p>
                      <p>{reservation.phone}</p>
                      <p>{reservation.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Notes</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {reservation.notes || "No special requests"}
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
