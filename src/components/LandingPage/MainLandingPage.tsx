
import FeaturedCarsRow from './featured-car/FeaturedCarRow';
import Footer from './Footer';
import MainBg from './mainBg/MainBg';
import PopularSearches from './PopularSearches';
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
      <PopularSearches />
      <Footer />
    </>      
  );
};

export default MainLandingPage;