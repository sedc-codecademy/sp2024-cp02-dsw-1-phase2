import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#06255B] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading tech retailer offering the latest gadgets and
              electronics.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-[#23B3B6]">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-[#23B3B6]">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#23B3B6]">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#23B3B6]">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="hover:text-[#23B3B6]">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-[#23B3B6]">
                  Shipping
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-[#23B3B6]">
                  Returns
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[#23B3B6]">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#23B3B6]">
                <Facebook />
              </a>
              <a href="#" className="hover:text-[#23B3B6]">
                <Twitter />
              </a>
              <a href="#" className="hover:text-[#23B3B6]">
                <Instagram />
              </a>
              <a href="#" className="hover:text-[#23B3B6]">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Tech Web Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
