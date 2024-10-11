import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <section className="bg-[#CBEDEE] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#06255B] mb-6">
          Subscribe to Our Newsletter
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#23B3B6]"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#23B3B6] text-white px-6 py-2 rounded-r-md hover:bg-[#06255B] transition-colors duration-300"
            >
              Subscribe
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
