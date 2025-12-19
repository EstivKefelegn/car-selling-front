// components/ManufacturerCard.tsx
import { Link } from 'react-router-dom';
import { buildImageUrl } from '../../../utils/imageUrlBuilder';
import FindCarsButton from '../../../utils/FindCars';

/* ---------- Types ---------- */

interface ManufacturerDetails {
  name: string;
  country: string;
  founded_year: number;
  description: string;
  website: string;
  logo_url?: string | null;
  is_ev_only: boolean;
}

interface ManufacturerCardProps {
  car: {
    manufacturer_details: ManufacturerDetails;
  };
  isDarkMode: boolean;
}

/* ---------- Component ---------- */

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  car,
  isDarkMode,
}) => {
  const manufacturer = car.manufacturer_details;

  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      {/* ================= HEADER ================= */}
      <div
        className={`flex items-center gap-4 p-6 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}
      >
        {manufacturer.logo_url && (
          <img
            src={buildImageUrl(manufacturer.logo_url)}
            alt={manufacturer.name}
            className="w-16 h-16 object-contain"
          />
        )}

        <div>
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {manufacturer.name}
          </h3>

          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {manufacturer.country} • Founded {manufacturer.founded_year}
          </p>

          {manufacturer.is_ev_only && (
            <span
              className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                isDarkMode
                  ? 'bg-green-900/40 text-green-300'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              EV-Only Manufacturer
            </span>
          )}
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-6">
        <p
          className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {manufacturer.description}
        </p>
      </div>

      {/* ================= CONTACT / ACTIONS ================= */}
      <div
        className={`p-6 flex flex-wrap gap-3 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <Link to={manufacturer.website} target="_blank">
          <FindCarsButton
            isDark={isDarkMode}
            text="Visit Manufacturer Website"
            style='bg-gray-500'
          />
          
        </Link>

        <button
          onClick={() =>
            window.open(
              `mailto:info@${manufacturer.name
                .toLowerCase()
                .replace(/\s+/g, '')}.com`
            )
          }
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          Contact Manufacturer
        </button>
      </div>
    </div>
  );
};

export default ManufacturerCard;
