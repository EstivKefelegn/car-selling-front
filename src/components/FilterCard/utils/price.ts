// utils/price.ts
export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `${(price / 1000000).toFixed(0)}M`;
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 100000) {
    return `${(price / 1000).toFixed(0)}K`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`;
  }
  return price.toLocaleString();
};

export const formatPriceForInput = (price: number): string => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const parsePriceInput = (value: string): number => {
  const cleanValue = value.replace(/[^\d]/g, '');
  return parseInt(cleanValue) || 0;
};