import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DebugMenu } from './components/DebugMenu';
import ScrollToTop from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Destinations
import { Paris } from './pages/destinations/Paris';
import { Kyoto } from './pages/destinations/Kyoto';
import { Maldives } from './pages/destinations/Maldives';
import { Dubai } from './pages/destinations/Dubai';
import { NewYork } from './pages/destinations/NewYork';
import { Bali } from './pages/destinations/Bali';
// Import generic for others right now to not break the app
import { DestinationDetail } from './pages/DestinationDetail';

function App() {
  return (
    <BookingProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-ink flex flex-col font-sans transition-colors duration-300">
          <Navbar />
          <div className="flex-1 pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Custom Destination Pages */}
              <Route path="/destination/paris" element={<Paris />} />
              <Route path="/destination/kyoto" element={<Kyoto />} />
              <Route path="/destination/maldives" element={<Maldives />} />
              <Route path="/destination/dubai" element={<Dubai />} />
              <Route path="/destination/newyork" element={<NewYork />} />
              <Route path="/destination/bali" element={<Bali />} />
              
              {/* Fallback for others currently mapped dynamically */}
              <Route path="/destination/:id" element={<DestinationDetail />} />
            </Routes>
          </div>
          <Footer />
          <DebugMenu />
        </div>
      </HashRouter>
    </BookingProvider>
  );
}

export default App;
