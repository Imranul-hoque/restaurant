"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/section-title";
import AnimatedSection from "@/components/animated-section";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/exterior.avif"
            alt="Restaurant exterior"
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
              Get in <span className="text-[#FFD700]">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We&apos;d love to hear from you. Reach out with any questions,
              feedback, or inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle
                title="Contact Information"
                subtitle="Reach out to us through any of the following channels"
              />

              <div className="space-y-6 mt-8">
                <div className="flex items-start">
                  <div className="bg-[#111111] p-3 rounded-lg mr-4">
                    <MapPin className="text-[#FFD700]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Address</h3>
                    <p className="text-gray-400">
                      123 Gourmet Street
                      <br />
                      Culinary District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#111111] p-3 rounded-lg mr-4">
                    <Phone className="text-[#FFD700]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-gray-400">
                      Reservations: (123) 456-7890
                      <br />
                      General Inquiries: (123) 456-7891
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#111111] p-3 rounded-lg mr-4">
                    <Mail className="text-[#FFD700]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-400">
                      Reservations: reservations@savoria.com
                      <br />
                      General Inquiries: info@savoria.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#111111] p-3 rounded-lg mr-4">
                    <Clock className="text-[#FFD700]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Hours</h3>
                    <p className="text-gray-400">
                      Monday - Friday: 11:00 AM - 10:00 PM
                      <br />
                      Saturday: 10:00 AM - 11:00 PM
                      <br />
                      Sunday: 10:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                title="Send Us a Message"
                subtitle="Fill out the form below and we'll get back to you as soon as possible"
              />

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white appearance-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="Reservation Inquiry">
                      Reservation Inquiry
                    </option>
                    <option value="Private Dining">Private Dining</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Career Opportunity">
                      Career Opportunity
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 px-6 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-md hover:bg-[#FFD700]/90 transition-colors"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Map Section */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Find Us"
            subtitle="Visit us at our location in the heart of the city"
            centered
          />

          <div className="mt-12 rounded-lg overflow-hidden h-[400px] md:h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236153.21826213578!2d91.65422053684527!3d22.357629612409568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sChittagong!5e0!3m2!1sen!2sbd!4v1746105280305!5m2!1sen!2sbd"
              className="w-full h-full"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#0A0A0A]/80 p-6 rounded-lg max-w-md text-center">
                <h3 className="text-xl font-bold mb-2">Savoria Restaurant</h3>
                <p className="text-gray-300 mb-4">
                  123 2 No. Gate
                  <br />
                  Chittagong District
                  <br />
                  Bangladesh
                </p>
                <p className="text-[#FFD700]">
                  Open Today: 11:00 AM - 10:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about Savoria"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111111] p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Do you accept walk-ins?
              </h3>
              <p className="text-gray-400">
                Yes, we accept walk-ins, but reservations are recommended,
                especially during peak hours and weekends to ensure
                availability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#111111] p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Is there a dress code?
              </h3>
              <p className="text-gray-400">
                We suggest smart casual attire. While we don&apos;t enforce a
                strict dress code, we appreciate guests who dress to match our
                elegant atmosphere.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#111111] p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Do you cater to dietary restrictions?
              </h3>
              <p className="text-gray-400">
                Absolutely. We offer vegetarian, vegan, and gluten-free options.
                Please inform us of any allergies or dietary restrictions when
                making your reservation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#111111] p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-3 text-[#FFD700]">
                Is parking available?
              </h3>
              <p className="text-gray-400">
                We offer valet parking for our guests. There are also several
                public parking garages within walking distance of the
                restaurant.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
