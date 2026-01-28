
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Wrench, FileText, CheckCircle, Smartphone, Clock, AlertCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { products, categories } from '@/data/products';
import { supabase } from '@/lib/customSupabaseClient';

const ServiceBooking = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Phone Verification State
  const [otp, setOtp] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    equipmentType: '',
    modelSpec: '',
    serviceType: 'Maintenance',
    condition: '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Pre-populate equipment if coming from product detail
    if (location.state?.selectedProduct) {
      const product = location.state.selectedProduct;
      setFormData(prev => ({
        ...prev,
        equipmentType: product.category,
        modelSpec: product.name
      }));
    }
  }, [location]);

  // Timer effect for OTP
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset phone verification if phone number changes
    if (name === 'phone' && isPhoneVerified) {
      setIsPhoneVerified(false);
      setShowOtpInput(false);
      setOtp('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePhone = (phone) => {
    // Basic validation for Indian numbers: 10 digits starting with 6-9
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone.replace(/\D/g, '').slice(-10));
  };

  const handleSendOtp = async () => {
    // Validate phone before sending
    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid 10-digit Indian phone number starting with 6-9' }));
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian phone number (e.g., 9876543210).",
      });
      return;
    }

    setIsOtpLoading(true);
    const formattedPhone = `+91${cleanPhone}`;

    try {
      // Get current session to ensure proper auth headers
      const { data: { session } } = await supabase.auth.getSession();

      const { data, error } = await supabase.functions.invoke('verify-phone-twilio', {
        body: JSON.stringify({ phoneNumber: formattedPhone, action: 'send' }),
        headers: {
          'Content-Type': 'application/json',
          // Explicitly pass Authorization header if session exists
          ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
        }
      });

      if (error) {
        // If the error is an object (parsed JSON from 400 response), use its message
        const errorMessage = error.message || (typeof error === 'object' && error.error) || 'Failed to send OTP';
        throw new Error(errorMessage);
      }
      
      if (!data.success) throw new Error(data.error || 'Failed to send OTP');

      setShowOtpInput(true);
      setOtpTimer(60);
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${formattedPhone}`,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        variant: "destructive",
        title: "Failed to Send OTP",
        description: error.message || "Could not send OTP. Please try again.",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter the verification code you received.",
      });
      return;
    }

    setIsVerifyingOtp(true);
    const formattedPhone = `+91${formData.phone.replace(/\D/g, '').slice(-10)}`;

    try {
      // Get current session to ensure proper auth headers
      const { data: { session } } = await supabase.auth.getSession();

      const { data, error } = await supabase.functions.invoke('verify-phone-twilio', {
        body: JSON.stringify({ phoneNumber: formattedPhone, action: 'verify', otp }),
        headers: {
          'Content-Type': 'application/json',
          // Explicitly pass Authorization header if session exists
          ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
        }
      });

      if (error) {
        const errorMessage = error.message || (typeof error === 'object' && error.error) || 'Verification failed';
        throw new Error(errorMessage);
      }

      if (data.success && data.verified) {
        setIsPhoneVerified(true);
        setShowOtpInput(false);
        setErrors(prev => ({ ...prev, phone: '' }));
        toast({
          title: "✅ Phone Verified",
          description: "Your phone number has been successfully verified.",
        });
      } else {
        throw new Error(data.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "Invalid OTP. Please try again.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Phone validation is strict now
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!isPhoneVerified) {
      newErrors.phone = 'Phone verification is required';
    }

    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.equipmentType) newErrors.equipmentType = 'Equipment type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPhoneVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please verify your phone number before submitting the booking request.",
      });
      // Scroll to phone field
      const phoneInput = document.querySelector('input[name="phone"]');
      if (phoneInput) phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('service_bookings')
        .insert([
          {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            company_name: formData.company,
            product_type: formData.equipmentType,
            equipment_model: formData.modelSpec,
            service_type: formData.serviceType,
            equipment_condition: formData.condition,
            appointment_date: formData.date,
            appointment_time: formData.time,
            additional_notes: formData.notes
          }
        ]);

      if (error) throw error;

      toast({
        title: "✅ Service Booked Successfully!",
        description: "We'll contact you shortly to confirm your appointment.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        equipmentType: '',
        modelSpec: '',
        serviceType: 'Maintenance',
        condition: '',
        date: '',
        time: '',
        notes: ''
      });
      setIsPhoneVerified(false);
      setOtp('');
      setShowOtpInput(false);

    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.message || "There was an error processing your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = ['Maintenance', 'Repair', 'Inspection', 'Other'];
  const equipmentCategories = categories.filter(cat => cat !== 'All Categories');

  return (
    <>
      <Helmet>
        <title>Book Service - Industrial Pro</title>
        <meta name="description" content="Schedule professional maintenance, repair, or inspection services for your industrial equipment. Expert technicians available 24/7." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2c3e50] py-16 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Schedule Service
              </h1>
              <p className="text-xl text-gray-300">
                Book expert maintenance, repair, or inspection services for your industrial equipment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl p-8 md:p-12 border border-gray-800 shadow-2xl"
              >
                
                {/* Verification Notice */}
                {!isPhoneVerified && (
                  <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-amber-500 font-semibold mb-1">Phone Verification Required</h3>
                      <p className="text-sm text-gray-400">
                        To ensure secure service booking, please verify your phone number:
                        <br />
                        1. Enter your 10-digit mobile number
                        <br />
                        2. Click "Send OTP" to receive a code via SMS
                        <br />
                        3. Enter the OTP code and click "Verify"
                      </p>
                    </div>
                  </div>
                )}

                {/* Customer Details Section */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Customer Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-[#ff6b35]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`w-full px-4 py-3 bg-[#1a1a1a] border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email <span className="text-[#ff6b35]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 bg-[#1a1a1a] border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number (+91) <span className="text-[#ff6b35]">*</span>
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            disabled={isPhoneVerified}
                            className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border ${
                              isPhoneVerified 
                                ? 'border-green-500/50 bg-green-500/5' 
                                : errors.phone 
                                  ? 'border-red-500' 
                                  : 'border-gray-700'
                            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
                          />
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium select-none">
                            +91
                          </span>
                          {isPhoneVerified && (
                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        </div>

                        {!isPhoneVerified ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={isOtpLoading || otpTimer > 0 || !formData.phone}
                              className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                              {isOtpLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : otpTimer > 0 ? (
                                <span className="text-gray-400">Resend in {otpTimer}s</span>
                              ) : (
                                <>
                                  <Smartphone className="w-4 h-4" />
                                  Send OTP
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <span className="text-green-500 font-medium">Verified Successfully</span>
                          </div>
                        )}
                      </div>

                      {/* OTP Input Section */}
                      {showOtpInput && !isPhoneVerified && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Enter OTP Code
                          </label>
                          <div className="flex gap-4">
                            <input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              placeholder="XXXXXX"
                              className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white text-center tracking-[0.5em] font-mono text-lg placeholder-gray-600 focus:outline-none focus:border-[#ff6b35] transition-colors"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={isVerifyingOtp || otp.length < 4}
                              className="px-6 py-3 bg-[#ff6b35] text-white rounded-lg font-medium hover:bg-[#e05a2b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-w-[120px]"
                            >
                              {isVerifyingOtp ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                'Verify'
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Didn't receive code? You can resend in {otpTimer} seconds.
                          </p>
                        </motion.div>
                      )}

                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name <span className="text-[#ff6b35]">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="ABC Manufacturing Co."
                        className={`w-full px-4 py-3 bg-[#1a1a1a] border ${errors.company ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
                      />
                      {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                    </div>
                  </div>
                </div>

                {/* Equipment Selection Section */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Equipment Selection</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Equipment Type <span className="text-[#ff6b35]">*</span>
                      </label>
                      <select
                        name="equipmentType"
                        value={formData.equipmentType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-[#1a1a1a] border ${errors.equipmentType ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors`}
                      >
                        <option value="">Select equipment type</option>
                        {equipmentCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.equipmentType && <p className="text-red-500 text-sm mt-1">{errors.equipmentType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Model / Specification
                      </label>
                      <input
                        type="text"
                        name="modelSpec"
                        value={formData.modelSpec}
                        onChange={handleChange}
                        placeholder="e.g., HX-5000, CP-2500"
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details Section */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Service Details</h2>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Service Type <span className="text-[#ff6b35]">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {serviceTypes.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: type }))}
                          className={`px-4 py-3 rounded-lg font-medium transition-all ${
                            formData.serviceType === type
                              ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white shadow-lg'
                              : 'bg-[#1a1a1a] text-gray-400 border border-gray-700 hover:border-[#ff6b35]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Equipment Condition / Issues
                    </label>
                    <textarea
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the current condition, issues, or specific service requirements..."
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Appointment Section */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Appointment</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date <span className="text-[#ff6b35]">*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 bg-[#1a1a1a] border ${errors.date ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors`}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Time <span className="text-[#ff6b35]">*</span>
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-[#1a1a1a] border ${errors.time ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors`}
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requirements, access instructions, or additional information..."
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isPhoneVerified}
                  whileHover={{ scale: isSubmitting || !isPhoneVerified ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || !isPhoneVerified ? 1 : 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold text-lg shadow-lg shadow-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/60 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : !isPhoneVerified ? (
                    <>
                      <Smartphone className="w-5 h-5" />
                      Verify Phone to Continue
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Service Request
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceBooking;
