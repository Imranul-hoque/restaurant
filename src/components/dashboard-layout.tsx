"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  CalendarRange,
  ClipboardList,
  Home,
  LogOut,
  Menu,
CalendarCog ,
  Tag,
  Users,
  Utensils,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth, UserButton } from "@clerk/nextjs";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Menu Items",
    href: "/dashboard/menu",
    icon: Utensils,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    title: "Reservations",
    href: "/dashboard/reservations",
    icon: CalendarRange,
  },
  {
    title: "Offers",
    href: "/dashboard/offers",
    icon: Tag,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: CalendarCog,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { userId, signOut } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <div className="flex h-16 items-center border-b px-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Utensils className="h-5 w-5 text-primary" />
                  <span>Restaurant Admin</span>
                </Link>
              </div>
              <nav className="grid gap-2 p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href && "bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <Utensils className="h-5 w-5 text-primary" />
            <span className="font-semibold">Restaurant Admin</span>
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            <span className="font-semibold">Restaurant Admin</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            {userId && (
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: {
                      backgroundColor: "#1a1a1a", // dark background
                      borderRadius: "8px",
                      padding: "4px",
                    },
                    avatarBox: {
                      boxShadow: "0 0 0 2px white", // optional styling
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <nav className="grid gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === item.href && "bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
            <Separator className="my-2" />
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
