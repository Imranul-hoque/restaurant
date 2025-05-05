"use client";

import type React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  children: React.ReactNode;
}

export default function ButtonLink({
  href,
  variant = "primary",
  size = "default",
  className,
  children,
}: ButtonLinkProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    primary: "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90",
    secondary:
      "bg-[#0A0A0A] text-white border border-[#FFD700] hover:bg-[#FFD700]/10",
    outline: "border border-white text-white hover:bg-white/10",
  };

  const sizeStyles = {
    default: "h-10 px-6 py-2",
    sm: "h-8 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
