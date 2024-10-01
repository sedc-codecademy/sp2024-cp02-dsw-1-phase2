export default function calculateDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  if (typeof price !== "number" || typeof discountPercentage !== "number") {
    return price;
  }
  return price - (price * discountPercentage) / 100;
}
