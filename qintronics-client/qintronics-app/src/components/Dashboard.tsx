import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "../common/types/Product-interface";
import Sidebar from "./DashboardSidebar";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import ProductGrid from "./ProductGrid";
import CategoryManager from "./CategoryManager";
import OrderManager from "./OrderManager";
import RecentActivity from "./RecentActivity";
import InventoryStatus from "./InventoryStatus";
import ProductSearch from "./ProductSearch";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCreateProduct = () => {
    console.log("Create product");
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdateProduct = (id: string) => {
    console.log("Update product", id);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-light text-gray-800 mb-8">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <StatCard title="Total Sales" value="$12,345" trend={12} />
              <StatCard title="Orders" value="142" trend={-5} />
              <StatCard title="Customers" value="1,234" trend={8} />
              <StatCard title="Avg. Order Value" value="$87" trend={3} />
            </div>
            <SalesChart />
            <InventoryStatus products={products} />
            <RecentActivity />
          </motion.div>
        );
      case "products":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-light text-gray-800 mb-8">Products</h2>
            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <ProductGrid
              products={filteredProducts}
              onCreateProduct={handleCreateProduct}
              onUpdateProduct={handleUpdateProduct}
              onRemoveProduct={handleRemoveProduct}
            />
          </motion.div>
        );
      case "categories":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-light text-gray-800 mb-8">
              Categories
            </h2>
            <CategoryManager />
          </motion.div>
        );
      case "orders":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-light text-gray-800 mb-8">Orders</h2>
            <OrderManager />
          </motion.div>
        );
      case "users": // NEW SECTION
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-light text-gray-800 mb-8">
              User Management
            </h2>
            <UserManagement />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 overflow-hidden">
        <main className="max-w-7xl mx-auto px-8 py-12">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
