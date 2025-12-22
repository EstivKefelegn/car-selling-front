import React, { useState, useEffect } from 'react';
import useContactOrder, { type ContactOrderData } from '../../../hooks/contact_order/useContactOrder';
import { useTranslation } from 'react-i18next';

interface ContactSellerFormProps {
  carId: number;
  carDisplayName: string;
  isDarkMode: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ContactSellerForm: React.FC<ContactSellerFormProps> = ({
  carId,
  carDisplayName,
  isDarkMode,
  onClose,
  onSuccess
}) => {
  const { submitContactOrder, loading, error, success } = useContactOrder();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactOrderData>({
    full_name: '',
    phone_number: '',
    electric_car_id: carId,
    message: '',
    preferred_contact_time: '24h'
  });

  const [errors, setErrors] = useState<Partial<ContactOrderData>>({});

  // Contact time options with translations
  const CONTACT_TIME_OPTIONS = [
    { value: '6h', label: t('contactSellerForm.contactTimes.6h') },
    { value: '24h', label: t('contactSellerForm.contactTimes.24h') },
    { value: '48h', label: t('contactSellerForm.contactTimes.48h') },
  ];

  // Handle success state
  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
    }
  }, [success, onSuccess]);

  const validateForm = () => {
    const newErrors: Partial<ContactOrderData> = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = t('contactSellerForm.validation.fullNameRequired');
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = t('contactSellerForm.validation.phoneRequired');
    } else if (!/^[\+]?[1-9][\d]{0,14}$/.test(formData.phone_number.replace(/\s+/g, ''))) {
      newErrors.phone_number = t('contactSellerForm.validation.phoneInvalid');
    }
    
    if (!formData.preferred_contact_time) {
      newErrors.preferred_contact_time = t('contactSellerForm.validation.contactTimeRequired');
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    
    try {
      await submitContactOrder(formData);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactOrderData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleContactTimeSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_contact_time: value
    }));
    
    if (errors.preferred_contact_time) {
      setErrors(prev => ({
        ...prev,
        preferred_contact_time: undefined
      }));
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
  } transition-colors outline-none`;

  const labelClasses = `block mb-2 font-medium ${
    isDarkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-black/70' : 'bg-black/50'
    }`} onClick={onClose}>
      <div className={`relative max-w-md w-full rounded-2xl shadow-xl ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t('contactSellerForm.title')}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className={`mt-1 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('contactSellerForm.about', { carName: carDisplayName })}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className={labelClasses}>
              {t('contactSellerForm.fullName')} {t('contactSellerForm.required')}
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.full_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('contactSellerForm.placeholder.fullName')}
              disabled={loading}
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone_number" className={labelClasses}>
              {t('contactSellerForm.phoneNumber')} {t('contactSellerForm.required')}
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.phone_number ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('contactSellerForm.placeholder.phoneNumber')}
              disabled={loading}
            />
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>
            )}
          </div>

          {/* Preferred Contact Time */}
          <div>
            <label className={labelClasses}>
              {t('contactSellerForm.contactTime')} {t('contactSellerForm.required')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CONTACT_TIME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleContactTimeSelect(option.value)}
                  className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                    formData.preferred_contact_time === option.value
                      ? isDarkMode
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.preferred_contact_time && (
              <p className="mt-1 text-sm text-red-500">{errors.preferred_contact_time}</p>
            )}
          </div>

          {/* Additional Message (Optional) */}
          <div>
            <label htmlFor="message" className={labelClasses}>
              {t('contactSellerForm.additionalMessage')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className={`${inputClasses} resize-none`}
              placeholder={t('contactSellerForm.placeholder.message')}
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                loading
                  ? 'opacity-70 cursor-not-allowed'
                  : ''
              } ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('contactSellerForm.submitting')}
                </span>
              ) : (
                t('contactSellerForm.submit')
              )}
            </button>
            
            {/* Error Display */}
            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <p className={`mt-3 text-center text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('contactSellerForm.successMessage')}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSellerForm;