"use client"

import AnimatedSection from "@/components/animated-section";
import SectionTitle from "@/components/section-title";
import ButtonLink from "@/components/ui/button-link";
import { featuredDishes } from "@/constant";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const FeaturedSection = () => {
    return (
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Featured Dishes"
            subtitle="Discover our chef's signature creations, crafted with the finest seasonal ingredients"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-[#111111] rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{dish.name}</h3>
                    <span className="text-[#FFD700] font-bold">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{dish.description}</p>
                  <ButtonLink href="/menu" variant="secondary" size="sm">
                    View Details
                  </ButtonLink>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <ButtonLink href="/menu" variant="primary">
              View Full Menu
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    );
};

export default FeaturedSection;
