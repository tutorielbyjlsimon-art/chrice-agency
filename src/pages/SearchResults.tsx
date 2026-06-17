import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import type { Flight } from '../context/BookingContext';
import mockData from '../mocks/mockFlights.json';

export const SearchResults = () => {
  const navigate = useNavigate();
  const { state, setSelectedFlight } = useBooking();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlights(mockData as Flight[]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    navigate('/checkout');
  };

  if (state.isOffline) {
    return (
      <div className="flex-1 mt-16">
        <h1 className="text-display mb-4 text-red-500">HORS LIGNE</h1>
        <p className="text-heading text-neutral-400">Vérifiez votre réseau.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 mt-16">
      <div className="mb-16">
        <h1 className="text-display mb-4 uppercase">Résultats</h1>
        <p className="text-heading text-neutral-400">
          {state.searchParams?.from || 'PPT'} → {state.searchParams?.to || 'BOB'} <br/>
          {state.searchParams?.passengers || 1} PASSAGER(S)
        </p>
      </div>

      <div className="v-rule-primary">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters (Vignelli style: just text) */}
          <aside className="md:col-span-1">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[#00FF66] mb-4">Filtres</h3>
            <div className="text-heading space-y-2 text-neutral-400">
              <p className="text-white cursor-pointer hover:text-[#00FF66]">DIRECT</p>
              <p className="cursor-pointer hover:text-white">1 ESCALE</p>
            </div>
          </aside>

          {/* Results */}
          <main className="md:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[#00FF66] mb-8">Vols Disponibles</h3>
            
            {loading ? (
              <div className="animate-pulse space-y-12">
                 {[1, 2].map(i => (
                   <div key={i} className="v-rule">
                     <div className="h-8 bg-neutral-800 w-1/2 mb-4"></div>
                     <div className="h-6 bg-neutral-800 w-1/4"></div>
                   </div>
                 ))}
              </div>
            ) : flights.length === 0 ? (
              <div className="v-rule">
                <h3 className="text-heading">AUCUN VOL TROUVÉ.</h3>
              </div>
            ) : (
              flights.map(flight => (
                <div key={flight.id} className="v-rule group">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                      <p className="text-heading text-[#00FF66]">{flight.departure.time} → {flight.arrival.time}</p>
                      <p className="text-body font-bold uppercase">{flight.airline} • {flight.duration}</p>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-heading">{flight.price} {flight.currency}</p>
                    </div>
                    <div className="md:col-span-1 text-right">
                      <button onClick={() => handleSelect(flight)} className="bg-white text-[#0A0A0A] px-6 py-2 font-bold uppercase hover:bg-[#00FF66] transition-colors sharp cursor-pointer">
                        Sélectionner
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
