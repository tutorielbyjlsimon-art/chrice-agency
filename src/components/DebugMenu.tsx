import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Settings, WifiOff, CreditCard } from 'lucide-react';

export const DebugMenu = () => {
  const { state, setOfflineMode, setForcePaymentError } = useBooking();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="glass-card p-5 mb-4 w-64 text-sm shadow-2xl border-brand-500/50">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-brand-500">
            <Settings size={16} /> Debug Menu
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white transition-colors">
              <span className="flex items-center gap-2"><WifiOff size={14} /> Hors-Ligne</span>
              <input 
                type="checkbox" 
                checked={state.isOffline}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="accent-brand-500 w-4 h-4 cursor-pointer"
              />
            </label>
            
            <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white transition-colors">
              <span className="flex items-center gap-2"><CreditCard size={14} /> Erreur Paiement</span>
              <input 
                type="checkbox" 
                checked={state.forcePaymentError}
                onChange={(e) => setForcePaymentError(e.target.checked)}
                className="accent-brand-500 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-500 text-ink p-4 rounded-full shadow-[0_5px_15px_rgba(205,162,96,0.4)] hover:bg-brand-400 transition-all hover:scale-110 cursor-pointer"
        title="Menu Débogage"
      >
        <Settings size={24} className={isOpen ? "animate-[spin_3s_linear_infinite]" : ""} />
      </button>
    </div>
  );
};
