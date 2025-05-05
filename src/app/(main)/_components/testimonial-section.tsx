"use client"

import AnimatedSection from "@/components/animated-section";
import SectionTitle from "@/components/section-title";
import { testimonials } from "@/constant";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

const Testimonials = () => {
    return (
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="What Our Guests Say"
            subtitle="The experiences of our valued patrons reflect our commitment to excellence"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#111111] p-6 rounded-lg shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-[#FFD700] fill-[#FFD700]"
                    />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    );
};

export default Testimonials;
