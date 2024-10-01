import { BaseProduct } from "../common/types/products-interface";
import calculateDiscountedPrice from "../common/helpers/calculate-discount-for-product.helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProductListProps {
  productList: BaseProduct[];
  title?: string;
}

const ProductList = ({
  productList,
  title = "Product Catalog",
}: ProductListProps) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation immediately when the component is mounted
    setIsLoaded(true);
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg min-h-screen flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6">
        {title}
      </h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-7xl mx-auto justify-center ${
          isLoaded ? "flip-in" : ""
        }`}
      >
        {productList.map((product, index) => {
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
              className={`relative rounded-lg text-center cursor-pointer transform transition-all ease-in-out duration-300 hover:scale-105 shadow-2xl hover:border hover:border-[#1A3F6B] bg-white product-card`}
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }} // Staggered effect for each product
            >
              {/* Discount badge on the left */}
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-[#1BD8C4] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.discount}% OFF
                </div>
              )}

              {/* Heart icon on the right */}
              <div className="absolute top-2 right-2">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-[#1A3F6B] text-lg border border-[#1A3F6B] rounded-full p-1 bg-white"
                />
              </div>

              <div className="p-4 sm:p-6 rounded-lg text-[#1A3F6B] h-full flex flex-col justify-between">
                <div className="w-full h-32 sm:h-40 flex justify-center items-center mb-2 sm:mb-4">
                  <img
                    src={product.img}
                    alt={`Image of ${product.name}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                    aria-label={`Image of ${product.name}`}
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mt-2">
                  {product.name}
                </h4>
                <p className="text-md mt-1">Brand: {product.brand}</p>
                <p
                  className={`text-lg sm:text-xl font-bold mt-1 ${
                    product.discount > 0 ? "text-[#1BD8C4]" : ""
                  }`}
                >
                  ${validDiscountedPrice}
                </p>
                {product.discount > 0 && (
                  <p className="text-sm mt-1 line-through">${validPrice}</p>
                )}
                <p className="text-md mt-1">
                  Availability: {product.availability} units
                </p>

                {/* Add to Cart Button */}
                <button className="mt-4 bg-[#1A3F6B] text-white font-bold py-1 px-3 rounded-lg mx-auto shadow-lg transition-all duration-300 border-2 border-transparent hover:bg-white hover:text-[#1A3F6B] hover:border-[#1A3F6B] flex items-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
