import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Shield, Clock, CheckCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Helmet>
        <title>Industrial Pro - Equipment Service & Maintenance Solutions</title>
        <meta name="description" content="Leading provider of industrial equipment service, maintenance, and repair solutions. Expert care for blowers, fans, compressors, pumps, and more." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1582533632670-55d43ff95331?w=1920&h=1080&fit=crop"
              alt="Industrial Facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/95 via-[#2c3e50]/90 to-[#0a0a0a]/95" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6 px-4 py-2 bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-full"
              >
                <span className="text-[#ff6b35] font-semibold text-sm">Trusted by Industry Leaders</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Industrial Equipment
                <span className="block bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent mt-2">
                  Service & Maintenance
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Expert maintenance, repair, and inspection services for your critical industrial equipment. Maximize uptime and extend equipment lifespan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold text-lg shadow-lg shadow-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/60 transition-all flex items-center justify-center gap-2"
                  >
                    View Equipment
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/booking">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    Book Service
                    <Wrench className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-[#ff6b35] rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose Industrial Pro
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Industry-leading service backed by decades of experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Certified Experts',
                  description: 'Factory-trained technicians with industry certifications and decades of combined experience.'
                },
                {
                  icon: Clock,
                  title: '24/7 Emergency Service',
                  description: 'Round-the-clock support for critical equipment failures to minimize downtime.'
                },
                {
                  icon: CheckCircle,
                  title: 'Quality Guaranteed',
                  description: 'All work backed by comprehensive warranties and quality assurance programs.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-8 rounded-xl border border-gray-800 hover:border-[#ff6b35]/50 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-[#1a1a1a]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Featured Equipment
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore our comprehensive range of industrial equipment solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold text-lg shadow-lg shadow-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/60 transition-all inline-flex items-center gap-2"
                >
                  View All Equipment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#2c3e50] to-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Optimize Your Equipment?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Schedule a service consultation and discover how our expert maintenance programs can reduce downtime and extend equipment life.
              </p>
              <Link to="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-bold text-xl shadow-2xl shadow-[#ff6b35]/50 hover:shadow-[#ff6b35]/70 transition-all inline-flex items-center gap-3"
                >
                  Schedule Service Now
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;