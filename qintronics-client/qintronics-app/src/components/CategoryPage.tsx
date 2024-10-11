import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { BaseProduct } from "../common/types/products-interface";
import products from "../data/products.json";
import Loader from "./Loader"; // Import the loader component

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<BaseProduct[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Show loader when category changes
    setLoading(true);

    if (category) {
      const filtered = (products as BaseProduct[]).filter((product) => {
        const normalizedCategory = category.toLowerCase().replace(/\s+/g, "-");
        const normalizedSubCategory = product.subCategory
          ?.toLowerCase()
          .replace(/\s+/g, "-");
        const normalizedMainCategory = product.category
          .toLowerCase()
          .replace(/\s+/g, "-");

        return (
          normalizedSubCategory === normalizedCategory ||
          normalizedSubCategory === normalizedCategory.slice(0, -1) || // For singular/plural matching
          normalizedMainCategory === normalizedCategory
        );
      });

      // Simulate loading delay
      setTimeout(() => {
        setFilteredProducts(filtered);
        setLoading(false); // Hide loader after products are filtered
      }, 800); // Simulate a delay (800ms)
    }
  }, [category]);

  return (
    <div className="category-page">
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <ProductList
          productList={filteredProducts}
          title={`Products in ${category}`}
        />
      )}
    </div>
  );
};

export default CategoryPage;
