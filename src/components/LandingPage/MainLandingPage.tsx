
import FeaturedCarsRow from './featured-car/FeaturedCarRow';
import Footer from '../Footer/Footer';
import MainBg from './mainBg/MainBg';
import PopularBrands from './PopularBrands';
import QuickManufacturerSearches from './quickSearch/QuickManufacturerSearches';
import ShopByManufacturer from './ShowByManufacturer';

const MainLandingPage = () => {
  
  return (
    <>
      <MainBg />  
      <QuickManufacturerSearches />
      <FeaturedCarsRow />
      <ShopByManufacturer 
        title="Shop by Make"
        subtitle="Browse cars by your favorite manufacturer"
        maxItems={10}
      />
      <PopularBrands />
      
    </>      
  );
};

export default MainLandingPage;