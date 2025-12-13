
import FeaturedCarsRow from './FeaturedCarRow';
import Footer from './Footer';
import MainBg from './MainBg';
import PopularSearches from './PopularSearches';
import QuickManufacturerSearches from './QuickManufacturerSearches';
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