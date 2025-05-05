"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/section-title";
import AnimatedSection from "@/components/animated-section";
import ButtonLink from "@/components/ui/button-link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { events, specialOffers } from "@/constant";



export default function Events() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events/events.avif"
            alt="Restaurant event"
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
              Events & <span className="text-[#FFD700]">Offers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover our special events and exclusive offers designed to
              enhance your dining experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Join us for these special culinary experiences"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111] rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar size={18} className="mr-2 text-[#FFD700]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock size={18} className="mr-2 text-[#FFD700]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin size={18} className="mr-2 text-[#FFD700]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="text-[#FFD700] font-semibold pt-1">
                      {event.price}
                    </div>
                  </div>
                  <ButtonLink href="/reservation" variant="primary">
                    Reserve a Spot
                  </ButtonLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Special Offers Section */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Special Offers"
            subtitle="Take advantage of these limited-time promotions"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0A0A0A] border border-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold">{offer.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">{offer.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-300">
                      Valid until:{" "}
                      <span className="text-[#FFD700]">{offer.validUntil}</span>
                    </div>
                    <div className="text-[#FFD700] font-semibold">
                      {offer.price}
                    </div>
                  </div>
                  <ButtonLink href="/reservation" variant="secondary">
                    Book Now
                  </ButtonLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Private Events Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Private Events"
                subtitle="Host your special occasions at Savoria"
              />

              <p className="text-gray-400 mb-6">
                From intimate gatherings to grand celebrations, Savoria offers
                elegant spaces and customized menus for your private events. Our
                dedicated events team will work with you to create a memorable
                experience tailored to your needs.
              </p>

              <h3 className="text-xl font-bold mb-4">We Cater To:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-400 mb-6">
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Corporate Events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Wedding Receptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Birthday Celebrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Anniversary Parties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Engagement Dinners</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Holiday Gatherings</span>
                </li>
              </ul>

              <ButtonLink href="/contact" variant="primary">
                Inquire About Private Events
              </ButtonLink>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/events/private-event.avif"
                alt="Private event space"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Seasonal Menu Section */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/events/seasonal.avif"
                alt="Seasonal dishes"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <SectionTitle
                title="Seasonal Menu"
                subtitle="Experience our limited-time seasonal offerings"
              />

              <p className="text-gray-400 mb-6">
                Our chef creates special seasonal menus that showcase the finest
                ingredients at their peak. These limited-time offerings allow
                you to experience unique flavors and innovative dishes that
                reflect the changing seasons.
              </p>

              <h3 className="text-xl font-bold mb-4">
                Current Seasonal Highlights:
              </h3>
              <ul className="space-y-3 text-gray-400 mb-6">
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Summer Truffle Risotto with Wild Mushrooms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Heirloom Tomato Salad with Burrata and Basil Oil</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Grilled Peach and Prosciutto Flatbread</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Berry Panna Cotta with Lavender Honey</span>
                </li>
              </ul>

              <ButtonLink href="/menu" variant="primary">
                View Full Menu
              </ButtonLink>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Stay Updated"
            subtitle="Subscribe to our newsletter to receive updates on upcoming events and special offers"
            centered
          />

          <div className="max-w-md mx-auto mt-8">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-[#111111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 px-6 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-md hover:bg-[#FFD700]/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              By subscribing, you agree to receive marketing emails from
              Savoria. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
