import FindCarsButton from '../../../utils/FindCars';
import { buildImageUrl } from '../../../utils/imageUrlBuilder';

const ActionButtons = ({ car, isDarkMode, onContactClick }: any) => (
  <div className="rounded-2xl p-6 ">
    <div className="flex flex-col sm:flex-row gap-4">
      <FindCarsButton
        isDark={isDarkMode}
        text="Contact The Seller"
        onClick={onContactClick}
      />

      {car.brochure_url && (
        <a
          href={buildImageUrl(car.brochure_url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-4 rounded-xl bg-purple-600 text-white font-bold"
        >
          Download Brochure
        </a>
      )}
    </div>
  </div>
);

export default ActionButtons;
