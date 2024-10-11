import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { BaseProduct } from "../common/types/products-interface";
import products from "../data/products.json";
import Sidebar from "./Sidebar";

const SalesPage = () => {
  const [saleProducts, setSaleProducts] = useState<BaseProduct[]>([]);

  useEffect(() => {
    const filteredProducts = (products as BaseProduct[]).filter(
      (product: BaseProduct) => product.discount > 0
    );
    setSaleProducts(filteredProducts);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
    <div className="sales-page">
      <ProductList productList={saleProducts} title="Products on Sale" />
      </div>
      </div>
  );
};

export default SalesPage;
