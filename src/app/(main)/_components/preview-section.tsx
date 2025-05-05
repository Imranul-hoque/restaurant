"use client"

import AnimatedSection from "@/components/animated-section";
import SectionTitle from "@/components/section-title";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";
import React from "react";

const PreviewSection = () => {
    return (
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/chef.avif"
                alt="Chef preparing food"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <SectionTitle
                title="Our Story"
                subtitle="Founded in 2010, Savoria has been serving exceptional cuisine with a focus on locally-sourced ingredients and innovative techniques."
              />

              <p className="text-gray-400 mb-6">
                Our team of passionate chefs draws inspiration from global
                culinary traditions while honoring classic techniques. Every
                dish tells a story of dedication to craft and respect for
                ingredients.
              </p>

              <ButtonLink href="/about" variant="secondary">
                Learn More About Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
};

export default PreviewSection;
