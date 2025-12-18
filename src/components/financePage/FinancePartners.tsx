// components/finance/FinancePartners.tsx
import React from 'react';

interface FinancePartner {
  id: number;
  name: string;
  logo: string;
  logo_url: string;
  description: string;
  min_apr: string;
  max_apr: string;
  apr_range: string;
}

interface FinancePartnersProps {
  partners: FinancePartner[];
  isDarkMode: boolean;
}

const FinancePartners: React.FC<FinancePartnersProps> = ({
  partners,
  isDarkMode
}) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    }`}>
      <h2 className="text-2xl font-bold mb-6">Our Finance Partners</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <div 
            key={partner.id}
            className={`rounded-xl p-4 text-center transition-all hover:scale-[1.05] ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-md hover:shadow-lg`}
          >
            <div className="h-16 mb-3 flex items-center justify-center">
              {partner.logo_url ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-xl font-bold">{partner.name}</div>
              )}
            </div>
            
            <h3 className="font-semibold mb-2">{partner.name}</h3>
            
            {partner.apr_range && (
              <div className={`text-sm px-3 py-1 rounded-full mb-2 ${
                isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                {partner.apr_range}
              </div>
            )}
            
            <p className="text-xs opacity-70 line-clamp-2">{partner.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm opacity-70">
          We work with trusted financial institutions to bring you the best rates
        </p>
      </div>
    </div>
  );
};

export default FinancePartners;