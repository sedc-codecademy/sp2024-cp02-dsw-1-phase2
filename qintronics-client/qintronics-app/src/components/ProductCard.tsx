// ProductCard.tsx
import { Product } from "../common/types/Product-interface";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-2">Price: ${product.price}</p>

      <div className="space-y-1 text-sm text-gray-600">
        {Object.entries(product.specifications).map(([key, value]) => (
          <p key={key}>
            <span className="font-medium">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
            </span>{" "}
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
