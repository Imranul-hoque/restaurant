"use client";

import type React from "react";

import { addReservation } from "@/actions/reservation";
import AnimatedSection from "@/components/animated-section";
import SectionTitle from "@/components/section-title";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function Reservation() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    specialRequests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const mainFormData = new FormData();
    mainFormData.append("name", formData.name);
    mainFormData.append("email", formData.email);
    mainFormData.append("phone", formData.phone);
    mainFormData.append("date", formData.date);
    mainFormData.append("time", formData.time);
    mainFormData.append("guests", formData.guests);
    mainFormData.append("occasion", formData.occasion);
    mainFormData.append("specialRequests", formData.specialRequests);

    setIsLoading(true)
    await addReservation(mainFormData)
      .then((res) => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          occasion: "",
          specialRequests: "",
        });
        window.location.href = "/";
        toast.success(res.message);
        setIsLoading(false);
        
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/reservation/table-image.avif"
            alt="Elegant table setting"
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
              Make a <span className="text-[#FFD700]">Reservation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Reserve your table and experience the finest dining at Savoria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle
                title="Book Your Table"
                subtitle="Complete the form below to request a reservation at Savoria. We'll contact you to confirm your booking."
              />

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium mb-2"
                    >
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white appearance-none"
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "person" : "people"}
                          </option>
                        ))}
                        <option value="9+">9+ people</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium mb-2"
                    >
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium mb-2"
                    >
                      Time *
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="occasion"
                    className="block text-sm font-medium mb-2"
                  >
                    Occasion (Optional)
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white appearance-none"
                  >
                    <option value="">Select (if applicable)</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business">Business Meal</option>
                    <option value="Date">Date Night</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm font-medium mb-2"
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                    placeholder="Any dietary restrictions, seating preferences, or other requests?"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-6 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-md hover:bg-[#FFD700]/90 transition-colors"
                >
                  {
                    isLoading ? (
                      <Loader className="animate-spin size-5" />
                    ) : " Request Reservation"
                  }
                </motion.button>

                <p className="text-sm text-gray-400">
                  * Required fields. By submitting this form, you agree to our
                  reservation policy. We'll contact you to confirm availability.
                </p>
              </motion.form>
            </div>

            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/images/reservation/form-image.avif"
                alt="Elegant restaurant table setting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Reservation Policies */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Reservation Policies"
            subtitle="Please review our policies to ensure a smooth dining experience"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
                Confirmation
              </h3>
              <p className="text-gray-400">
                All reservations require confirmation. We'll contact you via
                email or phone to confirm your booking within 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
                Cancellations
              </h3>
              <p className="text-gray-400">
                We kindly request 24 hours notice for cancellations. Late
                cancellations or no-shows may incur a fee.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#0A0A0A] p-6 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
                Large Parties
              </h3>
              <p className="text-gray-400">
                For groups of 8 or more, please contact us directly at (123)
                456-7890 to discuss special arrangements.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Private Dining */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <SectionTitle
                title="Private Dining"
                subtitle="Host your special events in our elegant private dining spaces"
              />

              <p className="text-gray-400 mb-6">
                Whether you're planning a corporate event, celebration, or
                intimate gathering, our private dining rooms offer the perfect
                setting. Our dedicated events team will work with you to create
                a customized menu and experience.
              </p>

              <ul className="space-y-3 text-gray-400 mb-6">
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>The Cellar: Intimate space for up to 12 guests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>The Gallery: Elegant room for up to 24 guests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>
                    The Terrace: Semi-private outdoor space for up to 40 guests
                  </span>
                </li>
              </ul>

              <p className="text-gray-400 mb-6">
                For private dining inquiries, please contact our events team at
                events@savoria.com or call (123) 456-7890.
              </p>
            </div>

            <div className="order-1 lg:order-2 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/reservation/private-dining-room.avif"
                alt="Private dining room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
