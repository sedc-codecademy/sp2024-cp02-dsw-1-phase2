// ProductFilter.tsx
import { useState, useEffect } from "react";
import { Product } from "../common/types/Product-interface";

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
  resetPage: () => void; // New prop for resetting the page
}

const ProductFilter = ({
  products,
  onFilterChange,
  resetPage, // Pass the resetPage function
}: ProductFilterProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [brand, setBrand] = useState<string | "all">("all");
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesBrand = brand === "all" || product.brand === brand;
      return matchesSearch && matchesCategory && matchesBrand;
    });

    onFilterChange(filtered);
  }, [search, category, brand, products, onFilterChange]);

  useEffect(() => {
    const brands = Array.from(
      new Set(
        products
          .filter(
            (product) => category === "all" || product.category === category
          )
          .map((product) => product.brand)
      )
    );
    setFilteredBrands(brands);
  }, [category, products]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-md mx-auto max-w-screen-md">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Categories</option>
          {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {category !== "all" && (
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Brands</option>
            {filteredBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={() => {
            setSearch("");
            setCategory("all");
            setBrand("all");
            onFilterChange(products);
            resetPage(); // Call resetPage to reset the whole page
          }}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
