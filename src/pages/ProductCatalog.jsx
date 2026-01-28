import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Industrial Equipment Catalog - Industrial Pro</title>
        <meta name="description" content="Browse our comprehensive catalog of industrial equipment including blowers, fans, compressors, pumps, motors, and filters. Expert service and maintenance available." />
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
                Equipment Catalog
              </h1>
              <p className="text-xl text-gray-300">
                Explore our comprehensive range of industrial equipment solutions with expert service and maintenance support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Filters */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-64 flex-shrink-0"
              >
                <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl p-6 border border-gray-800 sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="w-5 h-5 text-[#ff6b35]" />
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Search Equipment
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Equipment Type
                    </label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
                            selectedCategory === category
                              ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white shadow-lg'
                              : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] hover:text-white'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                      Showing <span className="text-[#ff6b35] font-semibold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </div>
              </motion.aside>

              {/* Products Grid */}
              <div className="flex-1">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.6 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl p-12 text-center border border-gray-800"
                  >
                    <div className="w-20 h-20 bg-[#ff6b35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-[#ff6b35]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
                    <p className="text-gray-400">
                      Try adjusting your filters or search query to find what you're looking for.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductCatalog;