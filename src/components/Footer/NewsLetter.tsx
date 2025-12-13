// components/Footer/Newsletter.tsx
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface NewsletterProps {
  isDarkMode: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Subscribed email:', email);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className={`py-8 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <h3 className={`text-xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Be the first to know about new listings
          </h3>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Send size={18} />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;