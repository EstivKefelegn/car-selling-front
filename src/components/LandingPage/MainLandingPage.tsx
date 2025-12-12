
import FeaturedCarsRow from './FeaturedCarRow';
import MainBg from './MainBg';
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
    </>      
  );
};

export default MainLandingPage;