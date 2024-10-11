import React from "react";
import { Product } from "../common/types/Product-interface";

interface InventoryStatusProps {
  products: Product[];
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ products }) => {
  const lowStockProducts = products.filter(
    (product) => product.availability < 10
  ); // Example threshold

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-medium text-gray-800 mb-4">
        Low Stock Alerts
      </h3>
      {lowStockProducts.length > 0 ? (
        <ul className="space-y-4">
          {lowStockProducts.map((product) => (
            <li
              key={product.id}
              className="bg-red-100 px-4 py-2 rounded-lg shadow"
            >
              <p className="font-medium text-red-600">
                {product.name}: Only {product.availability} left!
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">All products have sufficient stock.</p>
      )}
    </div>
  );
};

export default InventoryStatus;
