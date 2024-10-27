export function sortByPriceLowToHigh(products: any) {
  return products.slice().sort((a: any, b: any) => a.price - b.price);
}
export function sortByPriceHighToLow(products: any) {
  return products.slice().sort((a: any, b: any) => b.price - a.price);
}
export function calculateDiscount(product: any) {
  return ((product.mrp - product.price) / product.mrp) * 100;
}
export function sortByDiscountLowToHigh(products: any) {
  return products
    .slice()
    .sort((a: any, b: any) => calculateDiscount(a) - calculateDiscount(b));
}
export function sortByDiscountHighToLow(products: any) {
  return products
    .slice()
    .sort((a: any, b: any) => calculateDiscount(b) - calculateDiscount(a));
}
export function sortByNameAToZ(products: any) {
  return products
    .slice()
    .sort((a: any, b: any) => a.name.localeCompare(b.name));
}
export function sortByNameZToA(products: any) {
  return products
    .slice()
    .sort((a: any, b: any) => b.name.localeCompare(a.name));
}
