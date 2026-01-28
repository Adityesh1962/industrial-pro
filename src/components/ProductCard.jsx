import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#ff6b35]/20 transition-all duration-300 border border-gray-800 h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden h-56">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-[#ff6b35] text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {product.category}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>
            
            {product.price && (
              <div className="text-2xl font-bold text-[#ff6b35] mb-4">
                {product.price}
              </div>
            )}

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
              <span className="text-[#ff6b35] font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                View Details
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;