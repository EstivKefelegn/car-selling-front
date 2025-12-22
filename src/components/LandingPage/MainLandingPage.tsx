
import FeaturedCarsRow from './featured-car/FeaturedCarRow';
import Footer from '../Footer/Footer';
import MainBg from './mainBg/MainBg';
import PopularBrands from './PopularBrands';
import QuickManufacturerSearches from './quickSearch/QuickManufacturerSearches';
import ShopByManufacturer from './ShowByManufacturer';
import FeaturedLatestEvent from '../events/FeaturedLatestEvent';

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
      <FeaturedLatestEvent />
      <PopularBrands />
      
    </>      
  );
};

export default MainLandingPage;