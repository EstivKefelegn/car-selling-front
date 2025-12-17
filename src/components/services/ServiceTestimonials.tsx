// pages/services/ServiceTestimonials.tsx
import React from 'react';

interface ServiceTestimonial {
  id: number;
  customer_name: string;
  customer_vehicle: string;
  testimonial: string;
  rating: number;
  rating_display: string;
  customer_location: string;
  is_verified: boolean;
}

interface ServiceTestimonialsProps {
  testimonials: ServiceTestimonial[];
  isDarkMode: boolean;
}

const ServiceTestimonials: React.FC<ServiceTestimonialsProps> = ({ 
  testimonials, 
  isDarkMode 
}) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className={`rounded-2xl p-8 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
        : 'bg-gradient-to-r from-gray-50 to-gray-100'
    }`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className={`p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gray-700/50' 
                : 'bg-white'
            }`}
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {testimonial.is_verified && (
                <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  ✓ Verified
                </span>
              )}
            </div>
            
            <p className="italic mb-4">"{testimonial.testimonial}"</p>
            
            <div>
              <p className="font-semibold">{testimonial.customer_name}</p>
              <p className="text-sm opacity-70">
                {testimonial.customer_vehicle} Owner
                {testimonial.customer_location && ` • ${testimonial.customer_location}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTestimonials;