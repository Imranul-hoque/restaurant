import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">Restoria</h3>
            <p className="text-gray-400 mb-4">
              Experience exquisite cuisine in an elegant atmosphere. Our chefs
              create memorable dishes with the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors"
                >
                  Reservation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Gourmet Street</p>
              <p>Culinary District</p>
              <p>New York, NY 10001</p>
              <p className="pt-2">Phone: (123) 456-7890</p>
              <p>Email: info@savoria.com</p>
            </address>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Opening Hours
            </h4>
            <ul className="text-gray-400 space-y-2">
              <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
              <li>Saturday: 10:00 AM - 11:00 PM</li>
              <li>Sunday: 10:00 AM - 9:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Savoria Restaurant. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
