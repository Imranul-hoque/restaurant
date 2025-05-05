"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/section-title";
import AnimatedSection from "@/components/animated-section";
import { menuCategories, menuItems } from "@/constant";



export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("starters");

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/menu/food-presentation.avif"
            alt="Elegant food presentation"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-[#FFD700]">Menu</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our carefully crafted dishes, prepared with the finest
              ingredients and culinary expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Navigation */}
      <section className="sticky top-16 z-20 bg-[#0A0A0A] border-b border-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2 md:space-x-4 mx-auto">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm md:text-base whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? "bg-[#FFD700] text-[#0A0A0A] font-medium"
                      : "bg-[#111111] text-white hover:bg-[#FFD700]/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title={
              menuCategories.find((cat) => cat.id === activeCategory)?.name ||
              "Menu"
            }
            subtitle="Each dish is crafted with care using the finest seasonal ingredients"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {menuItems[activeCategory as keyof typeof menuItems].map(
              (item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex bg-[#111111] rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative w-1/3 min-h-[180px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <span className="text-[#FFD700] font-bold">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Special Dietary Options */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Dietary Options"
            subtitle="We cater to various dietary preferences and restrictions"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800 text-center"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Vegetarian
              </h3>
              <p className="text-gray-400">
                Delicious plant-based options crafted with the same care as our
                other dishes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800 text-center"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">Vegan</h3>
              <p className="text-gray-400">
                Creative and flavorful dishes made without any animal products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800 text-center"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Gluten-Free
              </h3>
              <p className="text-gray-400">
                Specially prepared options for those with gluten sensitivities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800 text-center"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Allergen-Friendly
              </h3>
              <p className="text-gray-400">
                Please inform your server of any allergies, and we&apos;ll
                accommodate your needs.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Chef's Note */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              A Note From Our <span className="text-[#FFD700]">Chef</span>
            </h2>
            <p className="text-gray-300 italic mb-6">
              &quot;Our menu is a reflection of our passion for culinary
              excellence. We source the finest ingredients, many from local
              producers, to create dishes that honor tradition while embracing
              innovation. Each plate is crafted with care, attention to detail,
              and a deep respect for the ingredients. We hope you enjoy your
              dining experience with us.&quot;
            </p>
            <p className="text-[#FFD700] font-semibold">- Chef Marco Rossi</p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
