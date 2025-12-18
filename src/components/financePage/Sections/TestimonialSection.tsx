// pages/finance/components/TestimonialSection.tsx
import React from 'react';

interface TestimonialSectionProps {
  isDarkMode: boolean;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ isDarkMode }) => {
  const testimonials = [
    {
      name: "Alex Johnson",
      car: "Tesla Model 3",
      quote: "The financing process was seamless. Got approved in 24 hours with a great rate!",
      rating: 5
    },
    {
      name: "Maria Garcia",
      car: "Ford Mustang Mach-E",
      quote: "Flexible terms and transparent pricing. Highly recommend their finance team.",
      rating: 5
    },
    {
      name: "David Chen",
      car: "BMW i4",
      quote: "Best rates in town. Saved me hundreds compared to other lenders.",
      rating: 5
    }
  ];

  return (
    <div className={`mt-16 rounded-2xl p-8 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
        : 'bg-gradient-to-r from-gray-50 to-gray-100'
    }`}>
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`p-6 rounded-xl ${
            isDarkMode 
              ? 'bg-gray-700/50' 
              : 'bg-white'
          }`}>
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="italic mb-4">"{testimonial.quote}"</p>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm opacity-70">{testimonial.car} Owner</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;