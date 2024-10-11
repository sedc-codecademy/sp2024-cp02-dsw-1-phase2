import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([
    "Laptops",
    "Smartphones",
    "Accessories",
  ]);

  const handleCreateCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <div>
      <motion.button
        onClick={handleCreateCategory}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PlusCircle size={16} className="mr-2" /> Create Category
      </motion.button>
      <div className="space-y-4">
        {categories.map((category) => (
          <motion.div
            key={category}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <span>{category}</span>
            <motion.button
              onClick={() => handleRemoveCategory(category)}
              className="p-2 text-red-500 hover:text-red-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 size={16} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
