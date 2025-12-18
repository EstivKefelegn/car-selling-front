// pages/finance/utils/formatters.ts
export const safeToFixed = (value: any, decimals: number = 2): string => {
  if (value === null || value === undefined) return '0.00';
  const num = Number(value);
  if (isNaN(num)) return '0.00';
  return num.toFixed(decimals);
};

export const safeToLocaleString = (value: any): string => {
  if (value === null || value === undefined) return '0';
  const num = Number(value);
  if (isNaN(num)) return '0';
  return num.toLocaleString();
};