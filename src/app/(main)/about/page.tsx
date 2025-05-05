"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/section-title";
import AnimatedSection from "@/components/animated-section";
import ButtonLink from "@/components/ui/button-link";
import { teamMembers } from "@/constant";



export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/interior.avif"
            alt="Restaurant interior"
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
              Our <span className="text-[#FFD700]">Story</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover the passion and dedication behind Savoria, where culinary
              excellence meets warm hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="The Beginning"
                subtitle="Founded in 2010 by Chef Marco Rossi, Savoria was born from a vision to create a dining experience that celebrates the art of fine cuisine."
              />

              <p className="text-gray-400 mb-6">
                What started as a small bistro has evolved into one of the
                city&apos;s most celebrated dining destinations. Our journey has
                been guided by a commitment to culinary excellence, exceptional
                service, and creating memorable experiences for our guests.
              </p>

              <p className="text-gray-400 mb-6">
                Through the years, we&apos;ve remained true to our founding
                philosophy: to source the finest ingredients, honor traditional
                techniques, and innovate with creativity and passion.
              </p>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about/old-restaurant.avif"
                alt="Restaurant in earlier days"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Mission Section */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about/chef-pre-food.avif"
                alt="Chef preparing food"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <SectionTitle
                title="Our Mission"
                subtitle="At Savoria, our mission is to create extraordinary dining experiences that delight the senses and nourish the soul."
              />

              <p className="text-gray-400 mb-6">
                We believe that great food is about more than just
                taste—it&apos;s about creating moments of joy, connection, and
                discovery. Every dish we serve is crafted with attention to
                detail and respect for ingredients.
              </p>

              <p className="text-gray-400 mb-6">
                We are committed to sustainability and supporting local
                producers, ensuring that our culinary creations not only taste
                exceptional but also reflect our responsibility to the
                environment and community.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Meet Our Team"
            subtitle="The talented individuals behind Savoria's culinary excellence"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111] rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-80">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#FFD700] mb-4">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide everything we do at Savoria"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0A0A0A] p-8 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
                Excellence
              </h3>
              <p className="text-gray-400">
                We strive for excellence in every aspect of our restaurant, from
                the quality of our ingredients to the precision of our service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0A0A0A] p-8 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
                Creativity
              </h3>
              <p className="text-gray-400">
                We embrace creativity and innovation, constantly exploring new
                flavors, techniques, and presentations to surprise and delight
                our guests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#0A0A0A] p-8 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
                Sustainability
              </h3>
              <p className="text-gray-400">
                We are committed to sustainable practices, from sourcing local
                ingredients to minimizing waste and reducing our environmental
                footprint.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the <span className="text-[#FFD700]">Savoria</span>{" "}
            Difference
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience crafted with passion
            and precision.
          </p>
          <ButtonLink href="/reservation" variant="primary" size="lg">
            Reserve Your Table
          </ButtonLink>
        </div>
      </AnimatedSection>
    </>
  );
}
