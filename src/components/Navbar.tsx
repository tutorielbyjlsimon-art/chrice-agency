import React, { useState, useEffect } from 'react';
import { User, Sun, Moon, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import type { Currency } from '../context/BookingContext';

export const Navbar = () => {
  const [isLight, setIsLight] = useState(false);
  const { state, setCurrency } = useBooking();

  useEffect(() => {
    if (isLight) document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
  }, [isLight]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="text-lg sm:text-2xl font-extrabold tracking-wide text-white">
          Chrice<span className="text-brand-500">Agency</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-semibold text-slate-300">
          <Link to="/" className="hover:text-brand-500 transition-colors">Vols & Hôtels</Link>
          <Link to="/about" className="hover:text-brand-500 transition-colors">À Propos</Link>
          <Link to="/contact" className="hover:text-brand-500 transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 text-white">
          
          {/* Currency Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 hover:text-brand-500 transition-colors rounded-full bg-white/5 font-bold text-xs sm:text-sm">
              <Globe size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden sm:inline">{state.currency}</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-24 glass-card shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2 overflow-hidden">
              {['EUR', 'USD', 'GBP', 'JPY'].map(c => (
                <button key={c} onClick={() => setCurrency(c as Currency)} className={`px-4 py-2 text-sm text-left hover:bg-brand-500/20 font-bold ${state.currency === c ? 'text-brand-500' : 'text-slate-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setIsLight(!isLight)} className="p-1 sm:p-2 hover:text-brand-500 transition-colors rounded-full bg-white/5 mx-1 sm:mx-2" title="Basculer le thème">
            {isLight ? <Moon size={16} className="sm:w-[20px] sm:h-[20px]" /> : <Sun size={16} className="sm:w-[20px] sm:h-[20px]" />}
          </button>
          
          <span className="text-sm font-bold text-brand-500 hidden md:block">Espace Premium</span>
          <button className="p-1 sm:p-2 hover:text-brand-500 transition-colors rounded-full bg-white/5">
            <User size={16} className="sm:w-[20px] sm:h-[20px]" />
          </button>
        </div>
      </div>
    </nav>
  );
};
