
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Phone, Mail, MessageSquare, Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ServiceRequestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    // Basic validation for Indian numbers: 10 digits starting with 6-9
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone.replace(/\D/g, '').slice(-10));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form for errors.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number to ensure +91 prefix
      const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
      const formattedPhone = `+91${cleanPhone}`;

      // Send POST request to the specified backend URL
      const response = await fetch('https://manex-api.onrender.com/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Payload includes name, phone, serviceType, and message as requested
        body: JSON.stringify({
          name: formData.name,
          phone: formattedPhone,
          serviceType: formData.serviceType,
          message: formData.message
        }),
      });

      if (!response.ok) {
        // Try to parse error message from response if available
        let errorMessage = `Server responded with ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Fallback if JSON parsing fails
        }
        throw new Error(errorMessage);
      }

      toast({
        title: "✅ Request Sent Successfully!",
        description: "We have received your service request and will contact you shortly.",
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "There was an error sending your request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    "General Maintenance",
    "Emergency Repair",
    "Equipment Inspection",
    "Consultation",
    "Parts Inquiry",
    "Other"
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl p-8 border border-gray-800 shadow-2xl"
    >
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-[#ff6b35]">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number <span className="text-[#ff6b35]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none z-10">
              +91
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98765 43210"
              className={`w-full pl-14 pr-4 py-3 bg-[#1a1a1a] border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
            />
            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address <span className="text-[#ff6b35]">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>

        {/* Service Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Service Required <span className="text-[#ff6b35]">*</span>
          </label>
          <div className="relative">
            <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border ${errors.serviceType ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors appearance-none`}
            >
              <option value="" disabled>Select a service type</option>
              {serviceTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>
          {errors.serviceType && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.serviceType}</p>}
        </div>

        {/* Message Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message details <span className="text-[#ff6b35]">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Please describe your requirements..."
              className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors resize-none`}
            />
          </div>
          {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold text-lg shadow-lg shadow-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Request
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ServiceRequestForm;
