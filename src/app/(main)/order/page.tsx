/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/section-title";
import AnimatedSection from "@/components/animated-section";
import { ShoppingCart, Plus, Minus, X, Loader } from "lucide-react";
import { MenuItem } from "@prisma/client";
import { getMenus } from "@/actions/menu";
import { toast } from "sonner";


type MenuCartItem = MenuItem & {
  quantity: number;
}

export default function Order() {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [cart, setCart] = useState<MenuCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isPending, startTransition] = useTransition()
  const [isProceeding, setIsProceeding] = useState(false);

  // Add item to cart

  useEffect(() => {
    startTransition(async () => {
      const data = await getMenus();
      setItems(data);
    })
  },[])

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle checkout
  const handleCheckout = async () => {

    setIsProceeding(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: cart })
    });

    const data = await res.json();
    
    if (data.ok) {
      setIsProceeding(false);
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      toast.error("Checkout Failed")
    }
    
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/order/food-delivery.webp"
            alt="Food delivery"
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
              Order <span className="text-[#FFD700]">Online</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Enjoy Savoria&apos;s exquisite cuisine in the comfort of your
              home. Place your order for pickup or delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Navigation */}
      <section className="sticky top-16 z-20 bg-[#0A0A0A] border-b border-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex space-x-2 md:space-x-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveCategory(item.category)}
                    className={`px-4 py-2 rounded-md text-sm md:text-base whitespace-nowrap transition-colors ${
                      activeCategory === item.category
                        ? "bg-[#FFD700] text-[#0A0A0A] font-medium"
                        : "bg-[#111111] text-white hover:bg-[#FFD700]/20"
                    }`}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center px-4 py-2 bg-[#FFD700] text-[#0A0A0A] rounded-md font-medium"
            >
              <ShoppingCart size={20} className="mr-2" />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0A0A0A] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title={
              items.find((item) => item.category === activeCategory)
                ?.category || "Menu"
            }
            subtitle="Order our chef's signature dishes for delivery or pickup"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {items
              .filter((item) => item.category === activeCategory)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#111111] rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <span className="text-[#FFD700] font-bold">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 h-12 truncate overflow-hidden">
                      {item.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(item)}
                      className="w-full py-2 bg-[#FFD700] text-[#0A0A0A] rounded-md font-medium flex items-center justify-center"
                    >
                      <Plus size={18} className="mr-2" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ShoppingCart size={64} className="mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-[#FFD700] hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center p-2 bg-[#111111] rounded-lg"
                      >
                        <div className="relative w-16 h-16 mr-4 rounded overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-[#FFD700]">${item.price}</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-700"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-white"
                        >
                          <X size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-800">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Delivery Fee:</span>
                    <span className="font-bold">$5.00</span>
                  </div>
                  <div className="flex justify-between mb-6 text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-[#FFD700]">
                      ${(cartTotal + 5).toFixed(2)}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckout}
                    className="flex items-center justify-center w-full py-3 bg-[#FFD700] text-[#0A0A0A] rounded-md font-bold"
                  >
                    {isProceeding ? (
                      <Loader className="size-5 animate-spin" />
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delivery Information */}
      <AnimatedSection className="py-20 bg-[#111111]" animation="slide-up">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Delivery Information"
            subtitle="Everything you need to know about our delivery service"
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
                Delivery Area
              </h3>
              <p className="text-gray-400">
                We currently deliver within a 5-mile radius of our restaurant.
                For locations outside this area, please call us to discuss
                options.
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
                Delivery Times
              </h3>
              <p className="text-gray-400">
                Lunch: 11:30 AM - 2:30 PM
                <br />
                Dinner: 5:30 PM - 9:30 PM
                <br />
                Please allow 45-60 minutes for delivery.
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
                Pickup Information
              </h3>
              <p className="text-gray-400">
                Prefer to pick up your order? Select the pickup option at
                checkout. Your order will be ready for collection at our
                designated pickup area.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Special Dietary Options */}
      <AnimatedSection className="py-20 bg-[#0A0A0A]" animation="fade">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/order/dietry-dishes.avif"
                alt="Special dietry dishes"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <SectionTitle
                title="Special Dietary Options"
                subtitle="We cater to various dietary preferences and restrictions"
              />

              <p className="text-gray-400 mb-6">
                At Savoria, we believe everyone should be able to enjoy
                exceptional cuisine. Our menu includes options for various
                dietary needs, all prepared with the same care and attention to
                detail as our regular menu items.
              </p>

              <ul className="space-y-3 text-gray-400 mb-6">
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Vegetarian and vegan options available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Gluten-free alternatives for many dishes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Allergen information available upon request</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  <span>Special requests accommodated when possible</span>
                </li>
              </ul>

              <p className="text-gray-400">
                Please note any dietary requirements in the special instructions
                section when placing your order.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
