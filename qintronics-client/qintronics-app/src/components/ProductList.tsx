import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseProduct } from "../common/types/products-interface";
import calculateDiscountedPrice from "../common/helpers/calculate-discount-for-product.helper";
import { FaShoppingCart } from "react-icons/fa";
import { ArrowRightLeft, Heart } from "lucide-react";
import Sidebar from "./Sidebar";
import Loader from "./Loader"; // Import the Loader component

interface ProductListProps {
  categoryName: string;
  productList: BaseProduct[];
  title?: string;
  total: number;
  currentPage: number;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onPageSizeChange: (size: number) => void; // Handler for changing page size
}

const ProductList = ({
  categoryName: category,
  productList = [],
  title = "Product Catalog",
  total,
  currentPage,
  pageSize,
  onNextPage,
  onPrevPage,
  hasNext,
  hasPrev,
  onPageSizeChange,
}: ProductListProps) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading as in the GiftCard component
    setIsLoaded(false);
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Adjust the loading delay as needed
    return () => clearTimeout(timeoutId);
  }, [productList]);

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
  };

  // Calculate the range of displayed products
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex justify-center items-start p-4 sm:p-6 lg:p-8">
        {isLoaded ? (
          <div className="flex flex-col items-center w-full max-w-7xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6">
              {title} {category}
            </h1>

            {/* Centered Dropdown and Pagination Controls */}
            <div className="flex flex-col items-center w-full mb-4">
              <div className="flex justify-center items-center mb-4">
                <label htmlFor="pageSize" className="mr-2 text-lg font-medium">
                  Products per page:
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1BD8C4] focus:border-[#1BD8C4] transition-all duration-300"
                >
                  <option value={8}>8</option>
                  <option value={16}>16</option>
                  <option value={24}>24</option>
                </select>
              </div>

              {/* Pagination Buttons */}
              <div className="flex justify-center items-center mb-6">
                <button
                  onClick={onPrevPage}
                  disabled={!hasPrev}
                  className={`px-4 py-2 rounded-lg text-white font-bold ${
                    hasPrev
                      ? "bg-[#1A3F6B] hover:bg-white hover:text-[#1A3F6B] border border-transparent hover:border-[#1A3F6B]"
                      : "bg-gray-300 cursor-not-allowed"
                  } transition-all duration-300`}
                >
                  Previous
                </button>
                <span className="mx-4">
                  Page {currentPage} of {Math.ceil(total / pageSize)}
                </span>
                <button
                  onClick={onNextPage}
                  disabled={!hasNext}
                  className={`px-4 py-2 rounded-lg text-white font-bold ${
                    hasNext
                      ? "bg-[#1A3F6B] hover:bg-white hover:text-[#1A3F6B] border border-transparent hover:border-[#1A3F6B]"
                      : "bg-gray-300 cursor-not-allowed"
                  } transition-all duration-300`}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full justify-center items-center">
              {productList.length > 0 ? (
                productList.map((product, index) => {
                  const price = Number(product.price);
                  const discountedPrice =
                    product.discount > 0
                      ? calculateDiscountedPrice(price, product.discount)
                      : price;

                  const validPrice = !isNaN(price) ? price.toFixed(2) : "0.00";
                  const validDiscountedPrice = !isNaN(discountedPrice)
                    ? discountedPrice.toFixed(2)
                    : "0.00";

                  return (
                    <div
                      className={`relative mx-auto w-full sm:w-60 md:w-64 lg:w-72 xl:w-80 h-auto rounded-lg text-center cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 shadow-lg hover:border hover:border-[#1A3F6B] bg-white product-card flex flex-col justify-between group`}
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {/* Discount badge on the left */}
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-[#1BD8C4] text-white text-xs font-bold px-2 py-1 rounded-full">
                          {product.discount}% OFF
                        </div>
                      )}

                      {/* Heart icon and ArrowRightLeft icon - Hidden until hover */}
                      <div className="absolute top-2 right-2 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart
                          size={24}
                          className="text-[#1A3F6B] border border-[#1A3F6B] rounded-full p-1 bg-white"
                        />
                        <ArrowRightLeft
                          size={24}
                          className="text-[#1A3F6B] border border-[#1A3F6B] rounded-full p-1 bg-white"
                        />
                      </div>

                      {/* Product image centered with lazy loading */}
                      <div className="p-4 sm:p-6 rounded-lg text-[#1A3F6B] h-full flex flex-col justify-between">
                        <div className="w-full h-32 sm:h-40 flex justify-center items-center mb-2 sm:mb-4">
                          <img
                            src={product.img}
                            alt={`Image of ${product.name}`}
                            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                            aria-label={`Image of ${product.name}`}
                            loading="lazy"
                          />
                        </div>
                        <h4 className="text-lg sm:text-xl font-semibold mt-2 min-h-[3rem] flex items-center justify-center">
                          {product.name}
                        </h4>
                        <p className="text-md mt-1">Brand: {product.brand}</p>

                        {/* Pricing Section */}
                        <div className="flex flex-col items-center">
                          <p
                            className={`text-lg sm:text-xl font-bold mt-1 ${
                              product.discount > 0 ? "text-[#1BD8C4]" : ""
                            }`}
                          >
                            ${validDiscountedPrice}
                          </p>
                          {product.discount > 0 && (
                            <p className="text-sm mt-1 line-through text-gray-500">
                              ${validPrice}
                            </p>
                          )}
                        </div>

                        <p className="text-md mt-1">
                          Availability: {product.availability} units
                        </p>

                        {/* Add to Cart Button */}
                        <button
                          className="mt-4 bg-[#1A3F6B] text-white font-bold py-1 px-3 rounded-lg mx-auto shadow-lg transition-all duration-300 border-2 border-transparent hover:bg-white hover:text-[#1A3F6B] hover:border-[#1A3F6B] flex items-center uppercase"
                          aria-label="Add to Cart"
                        >
                          <FaShoppingCart className="mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-lg">No products available.</p>
              )}
            </div>

            {/* Showing 1-20 of total results */}
            <div className="mt-6 text-center text-lg">
              Showing {startItem}-{endItem} of {total} results
            </div>
          </div>
        ) : (
          <Loader /> // Display loader while the products are being loaded
        )}
      </div>
    </div>
  );
};

export default ProductList;
