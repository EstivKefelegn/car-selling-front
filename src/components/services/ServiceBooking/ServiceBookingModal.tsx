// components/ServiceBookingModal.tsx - COMPLETE FIXED VERSION
import React, { useState, useEffect } from 'react';
import useServiceBookings, { 
  type ServiceBooking, 
  type ServiceType,
  SERVICE_TYPE_CHOICES 
} from '../../../hooks/serviceBooking/useServiceBooking';
import useEVCars, { type Car, type CarQuery } from '../../../hooks/cars/useEVCars'; 

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId?: number;
  isDarkMode: boolean;
}

const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose,
  vehicleId,
  isDarkMode
}) => {
  const { 
    createServiceBooking, 
    loading, 
    error, 
    clearError 
  } = useServiceBookings();
  
  // Define car query to fetch all available cars
  const carQuery: CarQuery = {};
  
  // Use your useEVCars hook to fetch electric cars
  const { data: electricCars, loading: loadingCars, error: carsError } = useEVCars(carQuery);
  
  const [step, setStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  const [serviceTypes] = useState<ServiceType[]>(SERVICE_TYPE_CHOICES);
  const [submitError, setSubmitError] = useState<string>('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(vehicleId || null);
  
  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState<ServiceBooking>(() => {
    // Initialize with default values - FORCE date and time to have values
    const today = getTodayDate();
    
    return {
      vehicle: vehicleId || null,
      service_type: null,
      service_type_custom: '',
      preferred_date: today, // Default to today
      preferred_time_slot: '09:00', // Default to morning slot
      alternative_dates: '',
      odometer_reading: null,
      service_description: '',
      symptoms_problems: '',
      customer_notes: '',
      full_name: '',
      email: '',
      phone: ''
    };
  });

  // Clear errors when modal opens
  useEffect(() => {
    if (isOpen) {
      clearError();
      setSubmitError('');
    }
  }, [isOpen, clearError]);

  // Set vehicle if provided
  useEffect(() => {
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
      setFormData(prev => ({ ...prev, vehicle: vehicleId }));
    }
  }, [vehicleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear errors when user starts typing
    if (error || submitError) {
      clearError();
      setSubmitError('');
    }
    
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleVehicleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const vehicleId = value ? Number(value) : null;
    setSelectedVehicleId(vehicleId);
    setFormData(prev => ({
      ...prev,
      vehicle: vehicleId
    }));
  };

  const handleServiceTypeSelect = (serviceType: ServiceType) => {
    setSelectedServiceType(serviceType);
    setFormData(prev => ({
      ...prev,
      service_type: serviceType.value
    }));
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError();
    setSubmitError('');
    
    // Final validation - CHECK ALL FIELDS
    console.log('Validating form data:', formData);
    console.log('selectedVehicleId:', selectedVehicleId);
    console.log('selectedServiceType:', selectedServiceType);
    console.log('preferred_date:', formData.preferred_date);
    console.log('preferred_time_slot:', formData.preferred_time_slot);
    
    const validationErrors = [];
    
    if (!selectedVehicleId) validationErrors.push('Please select a vehicle');
    if (!selectedServiceType) validationErrors.push('Please select a service type');
    if (!formData.full_name?.trim()) validationErrors.push('Please enter full name');
    if (!formData.email?.trim()) validationErrors.push('Please enter email');
    if (!formData.phone?.trim()) validationErrors.push('Please enter phone');
    if (!formData.preferred_date?.trim()) validationErrors.push('Please select a preferred date');
    if (!formData.preferred_time_slot?.trim()) validationErrors.push('Please select a time slot');
    
    if (selectedServiceType?.value === '10000km_service' && !formData.odometer_reading) {
      validationErrors.push('Please enter odometer reading for 10,000 KM Service');
    }
    
    if (selectedServiceType?.value === 'neta_warranty' && !formData.service_description?.trim()) {
      validationErrors.push('Please enter service description for NETA Warranty Service');
    }
    
    if (validationErrors.length > 0) {
      setSubmitError(validationErrors.join('; '));
      return;
    }
    
    // Prepare data - ensure all fields have values
    const bookingData: ServiceBooking = {
      ...formData,
      vehicle: selectedVehicleId!,
      service_type: selectedServiceType!.value,
      // Force date and time to have values
      preferred_date: formData.preferred_date || getTodayDate(),
      preferred_time_slot: formData.preferred_time_slot || '09:00',
      // Handle empty strings for optional fields
      alternative_dates: formData.alternative_dates || '',
      service_description: formData.service_description || '',
      symptoms_problems: formData.symptoms_problems || '',
      customer_notes: formData.customer_notes || '',
    };
    
    console.log('Final booking data to submit:', bookingData);
    console.log('Type of preferred_date:', typeof bookingData.preferred_date);
    console.log('Type of preferred_time_slot:', typeof bookingData.preferred_time_slot);
    
    try {
      await createServiceBooking(bookingData);
      alert('Service booking created successfully!');
      onClose();
      resetForm();
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      // Error is already set in the hook
    }
  };

  const resetForm = () => {
    const today = getTodayDate();
    
    setFormData({
      vehicle: vehicleId || null,
      service_type: null,
      service_type_custom: '',
      preferred_date: today, // Reset to today
      preferred_time_slot: '09:00', // Reset to morning slot
      alternative_dates: '',
      odometer_reading: null,
      service_description: '',
      symptoms_problems: '',
      customer_notes: '',
      full_name: '',
      email: '',
      phone: ''
    });
    setStep(1);
    setSelectedServiceType(null);
    setSelectedVehicleId(vehicleId || null);
    clearError();
    setSubmitError('');
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      clearError();
      setSubmitError('');
    }
  };

  const handleNext = () => {
    clearError();
    setSubmitError('');
    
    if (step === 1 && !selectedVehicleId) {
      setSubmitError('Please select a vehicle');
      return;
    }
    
    if (step === 2 && !selectedServiceType) {
      setSubmitError('Please select a service type');
      return;
    }
    
    if (step === 3 && (!formData.full_name?.trim() || !formData.email?.trim() || !formData.phone?.trim())) {
      setSubmitError('Please fill in all contact information');
      return;
    }
    
    if (step === 4) {
      // Additional validation for step 4
      if (!formData.preferred_date?.trim()) {
        setSubmitError('Please select a preferred date');
        return;
      }
      if (!formData.preferred_time_slot?.trim()) {
        setSubmitError('Please select a time slot');
        return;
      }
      if (selectedServiceType?.value === '10000km_service' && !formData.odometer_reading) {
        setSubmitError('Please enter odometer reading for 10,000 KM Service');
        return;
      }
      if (selectedServiceType?.value === 'neta_warranty' && !formData.service_description?.trim()) {
        setSubmitError('Please enter service description for NETA Warranty Service');
        return;
      }
    }
    
    setStep(step + 1);
  };

  // Helper function to display car name
  const getCarDisplayName = (car: Car) => {
    const parts = [];
    if (car.manufacturer_name) parts.push(car.manufacturer_name);
    if (car.model_name) parts.push(car.model_name);
    if (car.variant) parts.push(car.variant);
    if (car.model_year) parts.push(`(${car.model_year})`);
    
    return parts.join(' ');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl transition-all backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-900/80 text-white border border-gray-700/50' 
            : 'bg-white/90 text-gray-900 border border-gray-300/50'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
          }`}>
            <h3 className="text-2xl font-bold">
              Book Service Appointment
            </h3>
            <button
              onClick={onClose}
              className={`rounded-full p-2 transition-colors hover:scale-110 ${
                isDarkMode 
                  ? 'hover:bg-gray-700/60 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100/80 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700/50 text-gray-400'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {stepNumber}
                  </div>
                  <span className={`text-sm ${
                    step >= stepNumber
                      ? 'text-blue-600'
                      : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}>
                    {stepNumber === 1 && 'Vehicle'}
                    {stepNumber === 2 && 'Service Type'}
                    {stepNumber === 3 && 'Contact Info'}
                    {stepNumber === 4 && 'Details'}
                  </span>
                </div>
              ))}
              <div className={`flex-1 h-1 mx-2 ${
                step >= 2 ? 'bg-blue-600' : isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
              }`} />
              <div className={`flex-1 h-1 mx-2 ${
                step >= 3 ? 'bg-blue-600' : isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
              }`} />
              <div className={`flex-1 h-1 mx-2 ${
                step >= 4 ? 'bg-blue-600' : isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
              }`} />
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Step 1: Vehicle Selection */}
              {step === 1 && (
                <div>
                  <h4 className="text-lg font-medium mb-4">Select Your Vehicle</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Vehicle *</label>
                      {loadingCars ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <p className="mt-2 text-gray-500">Loading vehicles...</p>
                        </div>
                      ) : carsError ? (
                        <div className="p-4 rounded-xl bg-red-100/80 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                          <p>Error loading vehicles. Please try again.</p>
                        </div>
                      ) : electricCars.length === 0 ? (
                        <div className="p-4 rounded-xl bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                          <p>No vehicles available. Please contact support.</p>
                        </div>
                      ) : (
                        <>
                          <select
                            name="vehicle"
                            value={selectedVehicleId || ''}
                            onChange={handleVehicleSelect}
                            required
                            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                              isDarkMode
                                ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                                : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                            }`}
                          >
                            <option value="">Select a vehicle</option>
                            {electricCars.map((car) => (
                              <option key={car.id} value={car.id}>
                                {getCarDisplayName(car)}
                              </option>
                            ))}
                          </select>
                          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Select the vehicle that needs service
                          </p>
                        </>
                      )}
                    </div>
                    
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-gray-50 border border-gray-300/50'
                    }`}>
                      <h5 className="font-medium mb-2">Need to add a new vehicle?</h5>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        If your vehicle is not listed, please call our service center at 
                        <span className="font-semibold ml-1">1-800-NETA-SERVICE</span> to register it first.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Service Type Selection */}
              {step === 2 && (
                <div>
                  <h4 className="text-lg font-medium mb-4">Select Service Type</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {serviceTypes.map((serviceType) => (
                      <button
                        key={serviceType.value}
                        type="button"
                        onClick={() => handleServiceTypeSelect(serviceType)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] text-left ${
                          selectedServiceType?.value === serviceType.value
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg'
                            : isDarkMode
                            ? 'border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-lg mb-1">{serviceType.label}</div>
                            {serviceType.value === '10000km_service' && (
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Regular maintenance service at 10,000 km interval
                              </p>
                            )}
                            {serviceType.value === 'neta_warranty' && (
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Comprehensive warranty coverage service
                              </p>
                            )}
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedServiceType?.value === serviceType.value
                              ? 'border-blue-500 bg-blue-500'
                              : isDarkMode
                              ? 'border-gray-500'
                              : 'border-gray-400'
                          }`}>
                            {selectedServiceType?.value === serviceType.value && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div>
                  <h4 className="text-lg font-medium mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                            : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                            isDarkMode
                              ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                              : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                            isDarkMode
                              ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                              : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Conditional Fields */}
              {step === 4 && selectedServiceType && (
                <div>
                  <div className={`mb-6 p-4 rounded-xl backdrop-blur-sm ${
                    isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-100/80 border border-gray-300/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-1">{selectedServiceType.label}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Please provide additional information for your service
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedServiceType.value === '10000km_service'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {selectedServiceType.value === '10000km_service' ? 'KM Service' : 'Warranty'}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium mb-4">Additional Information</h4>
                  
                  {/* Conditional Fields */}
                  {selectedServiceType.value === '10000km_service' && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Odometer Reading (KM) *</label>
                      <input
                        type="number"
                        name="odometer_reading"
                        value={formData.odometer_reading || ''}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="Enter current odometer reading"
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                            : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                  )}

                  {selectedServiceType.value === 'neta_warranty' && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Service Description *</label>
                      <textarea
                        name="service_description"
                        value={formData.service_description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Please describe the warranty service needed..."
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                            : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                  )}

                  {/* Common Fields - REQUIRED */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Symptoms/Problems (Optional)</label>
                      <textarea
                        name="symptoms_problems"
                        value={formData.symptoms_problems}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Describe any symptoms or problems you're experiencing..."
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                            : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                        <input
                          type="date"
                          name="preferred_date"
                          value={formData.preferred_date || getTodayDate()}
                          onChange={handleInputChange}
                          required
                          min={getTodayDate()}
                          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                            isDarkMode
                              ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                              : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          }`}
                        />
                        <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Please select your preferred service date
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Time Slot *</label>
                        <select
                          name="preferred_time_slot"
                          value={formData.preferred_time_slot || '09:00'}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                            isDarkMode
                              ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                              : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          }`}
                        >
                          <option value="09:00">Morning (9:00 AM)</option>
                          <option value="13:00">Afternoon (1:00 PM)</option>
                          <option value="16:00">Evening (4:00 PM)</option>
                        </select>
                        <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Please select your preferred time slot
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Customer Notes (Optional)</label>
                      <textarea
                        name="customer_notes"
                        value={formData.customer_notes}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Any additional notes or special requests..."
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                            : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {(error || submitError) && (
                <div className="mt-4 p-4 rounded-xl backdrop-blur-sm border border-red-400/50 bg-red-100/80 dark:bg-red-900/30 dark:text-red-300">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="break-words">
                      {submitError || error}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className={`flex justify-between p-6 border-t ${
              isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            }`}>
              <button
                type="button"
                onClick={step > 1 ? handleBack : onClose}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                {step > 1 ? 'Back' : 'Cancel'}
              </button>
              
              <div className="flex gap-4">
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !selectedVehicleId) || 
                      (step === 2 && !selectedServiceType)
                    }
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Book Service'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingModal;