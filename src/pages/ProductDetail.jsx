import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle, Wrench, FileText, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Product Not Found</h2>
          <Link to="/products" className="text-[#ff6b35] hover:underline">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleBookService = () => {
    navigate('/booking', { state: { selectedProduct: product } });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Industrial Pro</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b35] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        {/* Product Header */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-2 bg-[#ff6b35] text-white font-semibold rounded-full">
                      {product.category}
                    </div>
                  </div>
                </div>

                {/* Additional Images */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {[
                    "https://images.unsplash.com/photo-1568099659323-b95d41d3dba3?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1698031610511-c7a35d121b17?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1641357436716-8d6acd752f8d?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1626341193993-394e8a952ba8?w=400&h=300&fit=crop"
                  ].map((img, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden aspect-square cursor-pointer hover:opacity-75 transition-opacity"
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {product.price && (
                  <div className="text-4xl font-bold text-[#ff6b35] mb-8">
                    {product.price}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookService}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold text-lg shadow-lg shadow-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/60 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Service
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon",
                      description: "Request a quote functionality will be available soon!",
                    })}
                    className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Request Quote
                  </motion.button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-4 rounded-lg border border-gray-800 text-center">
                    <Wrench className="w-6 h-6 text-[#ff6b35] mx-auto mb-2" />
                    <div className="text-sm text-gray-400">Service</div>
                    <div className="text-lg font-bold text-white">Available</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-4 rounded-lg border border-gray-800 text-center">
                    <Package className="w-6 h-6 text-[#ff6b35] mx-auto mb-2" />
                    <div className="text-sm text-gray-400">Warranty</div>
                    <div className="text-lg font-bold text-white">5 Years</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-4 rounded-lg border border-gray-800 text-center">
                    <CheckCircle className="w-6 h-6 text-[#ff6b35] mx-auto mb-2" />
                    <div className="text-sm text-gray-400">Certified</div>
                    <div className="text-lg font-bold text-white">ISO 9001</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#ff6b35]" />
                  Technical Specifications
                </h2>
                <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl p-6 border border-gray-800">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 last:border-0"
                        >
                          <td className="py-4 pr-4 text-gray-400 font-medium">{key}</td>
                          <td className="py-4 text-white font-semibold text-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-[#ff6b35]" />
                  Key Features
                </h2>
                <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl p-6 border border-gray-800">
                  <ul className="space-y-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#ff6b35]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-[#ff6b35]" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Maintenance Requirements */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Wrench className="w-8 h-8 text-[#ff6b35]" />
                Maintenance Requirements
              </h2>
              <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl p-8 border border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.maintenanceRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#ff6b35]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#ff6b35] font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-300">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-[#1a1a1a]">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <ProductCard product={relatedProduct} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProductDetail;