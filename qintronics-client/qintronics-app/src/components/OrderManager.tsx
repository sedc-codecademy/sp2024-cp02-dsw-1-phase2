import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "../common/types/Product-interface";

// Define the type for the order (for simplicity, linking orders to products)
interface Order {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: "Pending" | "Shipped" | "Delivered";
}

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching products from the JSON file (assuming you store orders data or generate them based on products)
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        const sampleOrders = data
          .slice(0, 5)
          .map((product: Product, index: number) => ({
            id: `Order${index + 1}`,
            product,
            quantity: Math.floor(Math.random() * 5) + 1,
            totalPrice: product.price * (Math.floor(Math.random() * 5) + 1),
            status: "Pending",
          }));
        setOrders(sampleOrders);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading orders...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-light text-gray-800 mb-8">
        Order Management
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-6">
              <img
                src={order.product.img}
                alt={order.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-medium text-gray-900">
                  {order.product.name}
                </h3>
                <p className="text-gray-500">Qty: {order.quantity}</p>
                <p className="text-gray-500">Total: ${order.totalPrice}</p>
              </div>
            </div>
            <div>
              <p
                className={`px-4 py-2 rounded-full text-sm ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {order.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderManager;
