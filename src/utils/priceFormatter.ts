// components/featured-cars/utils/priceFormatter.ts
export const formatPrice = (price: string): string => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return 'Price N/A';
  
  // Format with Birr currency symbol
  if (numPrice >= 10000000) {
    return `Br ${(numPrice / 10000000).toFixed(2)} Cr`;
  } else if (numPrice >= 100000) {
    return `Br ${(numPrice / 100000).toFixed(2)} L`;
  } else if (numPrice >= 1000) {
    return `Br ${(numPrice / 1000).toFixed(2)} K`;
  } else {
    return `Br ${numPrice.toLocaleString()}`;
  }
};