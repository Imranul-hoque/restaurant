"use client"

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ButtonLink from "@/components/ui/button-link";


const HeroSection = () => {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/hero-section.avif"
                  alt="Elegant restaurant interior"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
      
              <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                >
                  Experience <span className="text-[#FFD700]">Culinary</span>{" "}
                  Excellence
                </motion.h1>
      
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300"
                >
                  Indulge in a symphony of flavors crafted with passion and precision
                </motion.p>
      
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <ButtonLink href="/order" variant="primary" size="lg">
                    Order Now
                  </ButtonLink>
                  <ButtonLink href="/reservation" variant="secondary" size="lg">
                    Book a Table
                  </ButtonLink>
                </motion.div>
              </div>
            </section>
  )
};

export default HeroSection;
