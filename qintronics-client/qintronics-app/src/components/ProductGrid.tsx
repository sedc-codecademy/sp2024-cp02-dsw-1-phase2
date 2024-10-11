import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Product } from "../common/types/Product-interface";

interface ProductGridProps {
  products: Product[];
  onCreateProduct: () => void;
  onUpdateProduct: (id: string) => void;
  onRemoveProduct: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onCreateProduct,
  onUpdateProduct,
  onRemoveProduct,
}) => (
  <div>
    <motion.button
      onClick={onCreateProduct}
      className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <PlusCircle size={16} className="mr-2" /> Create Product
    </motion.button>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-sm"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-lg font-medium mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.brand}</p>
          <p className="text-blue-600 font-medium">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Stock: {product.availability}
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <motion.button
              onClick={() => onUpdateProduct(product.id)}
              className="p-2 bg-blue-500 text-white rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit size={16} />
            </motion.button>
            <motion.button
              onClick={() => onRemoveProduct(product.id)}
              className="p-2 bg-red-500 text-white rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ProductGrid;
