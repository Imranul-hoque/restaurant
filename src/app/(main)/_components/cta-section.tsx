"use client"

import AnimatedSection from "@/components/animated-section";
import ButtonLink from "@/components/ui/button-link";
import React from "react";

const CTASection = () => {
    return (
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience <span className="text-[#FFD700]">Savoria</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Reserve your table
            today or order online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ButtonLink href="/reservation" variant="primary" size="lg">
              Book a Table
            </ButtonLink>
            <ButtonLink href="/order" variant="secondary" size="lg">
              Order Online
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    );
};

export default CTASection;
