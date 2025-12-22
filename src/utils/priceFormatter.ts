import i18n from '../i18n';

export const formatPrice = (price: string): string => {
  const numPrice = parseFloat(price);

  if (isNaN(numPrice)) {
    return i18n.t('price.notAvailable');
  }

  const currency = i18n.t('price.currency');
  const thousand = i18n.t('price.thousand'); 
  const million = i18n.t('price.million');  

  if (numPrice >= 1_000_000) {
    return `${currency} ${(numPrice / 1_000_000).toFixed(1)}${million}`;
  }

  if (numPrice >= 1_000) {
    return `${currency} ${(numPrice / 1_000).toFixed(1)}${thousand}`;
  }

  return `${currency} ${numPrice.toLocaleString('en-ET')}`;
};
