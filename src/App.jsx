
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductCatalog from '@/pages/ProductCatalog';
import ProductDetail from '@/pages/ProductDetail';
import ServiceBooking from '@/pages/ServiceBooking';
import ServiceRequestPage from '@/pages/ServiceRequestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/booking" element={<ServiceBooking />} />
            <Route path="/service-request" element={<ServiceRequestPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
