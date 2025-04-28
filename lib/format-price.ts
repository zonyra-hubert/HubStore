export default function FormatPrice(price: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "GHS",
  }).format(price);
}
