import { motion } from "framer-motion";

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Microsoft",
  "Google",
  "LG",
  "Dell",
  "Asus",
];

const BrandsShowcase = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {brands.map((brand, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl font-semibold text-gray-800">{brand}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default BrandsShowcase;
