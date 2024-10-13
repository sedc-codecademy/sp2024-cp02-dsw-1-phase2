import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1BD8C4] to-[#1A3F6B] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6">About Us</h3>
            <p className="text-sm leading-relaxed">
              We are a leading tech retailer offering the latest gadgets and
              electronics, bringing the best of innovation to your doorstep.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/faq"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
            <div className="flex space-x-6">
              <a
                href="#"
                className="hover:text-[#FFD700] transition-transform transform hover:scale-110"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-[#FFD700] transition-transform transform hover:scale-110"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="hover:text-[#FFD700] transition-transform transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="hover:text-[#FFD700] transition-transform transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-400 text-center">
          <p className="text-sm">
            &copy; 2024 Qintronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
