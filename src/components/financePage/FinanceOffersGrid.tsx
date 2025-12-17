// components/finance/FinanceOffersGrid.tsx
import React from 'react';

interface FinanceOffer {
  id: number;
  title: string;
  short_description: string;
  offer_type: string;
  offer_type_display: string;
  apr_rate: string;
  cashback_amount: string;
  down_payment_percent: string;
  term_months: number;
  valid_from: string;
  valid_until: string;
  featured_image: string;
  display_color: string;
  is_current: boolean;
  days_remaining: number;
}

interface FinanceOffersGridProps {
  title: string;
  offers: FinanceOffer[];
  loading: boolean;
  isDarkMode: boolean;
}

const FinanceOffersGrid: React.FC<FinanceOffersGridProps> = ({
  title,
  offers,
  loading,
  isDarkMode
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2">Loading offers...</p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <p className="opacity-70">No current offers available</p>
      </div>
    );
  }

  const getOfferBadge = (offerType: string) => {
    const badges = {
      low_apr: { text: 'Low APR', color: 'bg-green-500' },
      cashback: { text: 'Cashback', color: 'bg-purple-500' },
      zero_down: { text: 'Zero Down', color: 'bg-blue-500' },
      special_lease: { text: 'Lease Deal', color: 'bg-orange-500' },
      loyalty: { text: 'Loyalty', color: 'bg-pink-500' },
      seasonal: { text: 'Seasonal', color: 'bg-red-500' }
    };
    return badges[offerType as keyof typeof badges] || { text: 'Special', color: 'bg-gray-500' };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className={`px-3 py-1 rounded-full text-sm ${
          isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
        }`}>
          {offers.length} offers
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const badge = getOfferBadge(offer.offer_type);
          
          return (
            <div 
              key={offer.id}
              className={`rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
              } shadow-lg`}
              style={{ borderColor: offer.display_color }}
            >
              {/* Offer Header */}
              <div className="p-5 border-b" style={{ 
                borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                backgroundColor: offer.display_color ? `${offer.display_color}10` : 'transparent'
              }}>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${badge.color}`}>
                    {badge.text}
                  </span>
                  {offer.days_remaining > 0 && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                    }`}>
                      {offer.days_remaining} days left
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-sm opacity-80">{offer.short_description}</p>
              </div>

              {/* Offer Details */}
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {offer.apr_rate && (
                    <div className={`text-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-sm opacity-80">APR Rate</div>
                      <div className="text-2xl font-bold text-blue-500">
                        {offer.apr_rate}%
                      </div>
                    </div>
                  )}
                  
                  {offer.cashback_amount && (
                    <div className={`text-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-sm opacity-80">Cashback</div>
                      <div className="text-xl font-bold text-green-500">
                        ${parseFloat(offer.cashback_amount).toLocaleString()}
                      </div>
                    </div>
                  )}
                  
                  {offer.down_payment_percent && (
                    <div className={`text-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-sm opacity-80">Down Payment</div>
                      <div className="text-xl font-bold">
                        {offer.down_payment_percent}%
                      </div>
                    </div>
                  )}
                  
                  {offer.term_months && (
                    <div className={`text-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-sm opacity-80">Term</div>
                      <div className="text-xl font-bold">
                        {offer.term_months / 12} Years
                      </div>
                    </div>
                  )}
                </div>

                <button 
                    onClick={() => console.log('View offer:', offer.id)}
                    className={`group relative w-full px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl ${
                        isDarkMode
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                    } hover:scale-105 font-semibold`}
                    >
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                        <span>View Details</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinanceOffersGrid;