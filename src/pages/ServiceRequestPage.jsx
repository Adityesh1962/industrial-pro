
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import { Settings, PhoneCall, Clock } from 'lucide-react';

const ServiceRequestPage = () => {
  return (
    <>
      <Helmet>
        <title>Service Request - Industrial Pro</title>
        <meta name="description" content="Submit a service request for industrial equipment maintenance, repair, or consultation. Our team is ready to assist you." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2c3e50] py-16 border-b border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-eab62e97a78e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/20 border border-[#ff6b35]/30 text-[#ff6b35] text-sm font-medium mb-4">
                <Settings className="w-4 h-4" />
                <span>Expert Support</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                How Can We <span className="text-[#ff6b35]">Help You?</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Submit a general service request below. For specific equipment booking, please visit our booking page. We respond to all inquiries within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column: Contact Info & Value Props */}
              <div className="lg:col-span-1 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-800"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-[#ff6b35]" />
                    Direct Contact
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Need immediate assistance? Call our support line directly.
                  </p>
                  <a href="tel:+919876543210" className="text-2xl font-bold text-white hover:text-[#ff6b35] transition-colors">
                    +91 98765 43210
                  </a>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-800"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#ff6b35]" />
                    Support Hours
                  </h3>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-[#ff6b35]">Emergency Only</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-2">
                <ServiceRequestForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceRequestPage;
