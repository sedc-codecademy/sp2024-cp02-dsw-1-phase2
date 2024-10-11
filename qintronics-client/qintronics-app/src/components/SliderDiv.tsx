// SliderDiv.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../common/types/Product-interface";

const SliderDiv = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(getRandomProducts(data)); // Fetch and set 8 random products
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    const getRandomProducts = (products: Product[]): Product[] => {
      // Shuffle the products array and return the first 8 items
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 8);
    };

    fetchProducts();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000); // 3 seconds delay

    return () => clearInterval(interval);
  }, [products.length]);

  // Handle dot click to change currentIndex
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-[90vw] max-w-7xl h-[60vh] mx-auto bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden">
      <AnimatePresence>
        <motion.div
          className="absolute w-full h-full flex"
          key={currentIndex}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {products.map(
            (product, index) =>
              index === currentIndex && (
                <motion.div
                  key={product.id}
                  className="relative w-full flex-shrink-0 h-full bg-white rounded-xl overflow-hidden shadow-xl transition-transform"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-90"
                  />
                  <motion.div
                    className="absolute inset-0 flex items-end p-4"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-black max-w-xs w-full">
                      <h2 className="text-2xl font-bold mb-2">
                        {product.name}
                      </h2>
                      <p className="text-sm mb-2">{product.description}</p>
                      <p className="text-lg font-semibold">${product.price}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full cursor-pointer transition-transform duration-300 ${
              index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-400"
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderDiv;
