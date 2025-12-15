// components/Footer/Newsletter.tsx
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import apiClient from '../../services/api-client';
import { useDarkModeStore } from '../../store/useDarkModeStore';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { isDarkMode } = useDarkModeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await apiClient.post('/cars/subscribe/', {
        email: email.trim().toLowerCase(),
      });

      if (response.data.success) {
        setMessage(response.data.message || 'Successfully subscribed! You will receive new listing alerts.');
        setEmail('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(response.data.errors?.email?.[0] || 'Subscription failed');
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`py-8 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h3 className={`text-xl md:text-2xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Be the first to know about new listings
        </h3>

        {/* Responsive form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage('');
            }}
            placeholder="Your email address"
            required
            disabled={isSubmitting}
            className={`w-full sm:flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg sm:rounded-r-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
          </button>
        </form>

        {message && (
          <div
            className={`mt-3 text-sm text-center ${
              message.toLowerCase().includes('success')
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <p className={`mt-4 text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          By subscribing, you agree to receive new listing alerts. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
