"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/section-title";
import AnimatedSection from "@/components/animated-section";
import { Calendar, User, Tag } from "lucide-react";
import { blogPosts, categories } from "@/constant";



export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter posts by category
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/food-blog.avif"
            alt="Food blog"
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
              Our <span className="text-[#FFD700]">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Insights, stories, and culinary wisdom from the Savoria team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-20 bg-[#0A0A0A] border-b border-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2 md:space-x-4 mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm md:text-base whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-[#FFD700] text-[#0A0A0A] font-medium"
                      : "bg-[#111111] text-white hover:bg-[#FFD700]/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Latest Articles"
            subtitle="Explore our collection of culinary insights and stories"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111] rounded-lg overflow-hidden shadow-lg"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-56">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1 text-[#FFD700]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag size={14} className="mr-1 text-[#FFD700]" />
                      <span>{post.category}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl font-bold mb-3 hover:text-[#FFD700] transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm">
                    <User size={14} className="mr-1 text-[#FFD700]" />
                    <span className="text-gray-300">By {post.author}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-[#FFD700] font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Post */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Featured Article"
            subtitle="Our most popular and insightful piece"
            centered
          />

          <div className="mt-12 bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[300px] lg:h-auto">
                <Image
                  src="/images/blog/feature-article.avif"
                  alt="Featured article"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1 text-[#FFD700]" />
                    <span>May 10, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag size={14} className="mr-1 text-[#FFD700]" />
                    <span>Culinary Techniques</span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  The Secret to Perfect Pasta: Techniques from Italian Masters
                </h3>

                <p className="text-gray-400 mb-6">
                  Discover the time-honored techniques and secrets behind
                  creating authentic Italian pasta. From selecting the right
                  flour to achieving the perfect al dente texture, our executive
                  chef shares wisdom gained from years of training with Italian
                  pasta masters.
                </p>

                <div className="flex items-center text-sm mb-6">
                  <User size={14} className="mr-1 text-[#FFD700]" />
                  <span className="text-gray-300">By Chef Marco Rossi</span>
                </div>

                <Link
                  href="/blog/perfect-pasta-techniques"
                  className="inline-block px-6 py-3 bg-[#FFD700] text-[#0A0A0A] rounded-md font-medium hover:bg-[#FFD700]/90 transition-colors"
                >
                  Read Full Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Subscribe to Our Blog"
            subtitle="Get the latest articles and culinary insights delivered to your inbox"
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
              By subscribing, you agree to receive our newsletter emails. You
              can unsubscribe at any time.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
