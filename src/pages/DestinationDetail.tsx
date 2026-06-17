import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import type { Flight } from '../context/BookingContext';
import { Calendar as CalendarIcon, Users, MapPin, Plane, CheckCircle, Sparkles } from 'lucide-react';
import mockFlights from '../mocks/mockFlights.json';

const destData = {
  paris: { name: 'Paris, France', img: 'https://images.unsplash.com/photo-1502602881462-8c976cc5309e?q=80&w=2000&auto=format&fit=crop', desc: 'La ville lumière vous attend pour un séjour romantique inoubliable avec des visites exclusives.', priceRange: '450', cheapMonth: 'Janvier' },
  kyoto: { name: 'Kyoto, Japon', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop', desc: "Plongez dans l'harmonie et la beauté sereine des temples ancestraux.", priceRange: '1200', cheapMonth: 'Février' },
  maldives: { name: 'Les Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop', desc: 'Bungalows luxueux sur des eaux turquoise pour une détente absolue.', priceRange: '1500', cheapMonth: 'Novembre' },
  dubai: { name: 'Dubaï, EAU', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop', desc: 'Le luxe futuriste et le shopping de classe mondiale au cœur du désert.', priceRange: '700', cheapMonth: 'Mai' },
  newyork: { name: 'New York, USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop', desc: 'La ville qui ne dort jamais, de Broadway à Central Park.', priceRange: '600', cheapMonth: 'Septembre' },
  bali: { name: 'Bali, Indonésie', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop', desc: 'Retraite spirituelle, plages de rêve et nature luxuriante.', priceRange: '850', cheapMonth: 'Mars' }
};

export const DestinationDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setSearchParams, setSelectedFlight } = useBooking();
  
  const dest = destData[id as keyof typeof destData];
  
  const queryParams = new URLSearchParams(location.search);
  const initialTripType = queryParams.get('type') || 'aller-retour';
  
  const [tripType, setTripType] = useState(initialTripType);
  const [dateAller, setDateAller] = useState('');
  const [dateRetour, setDateRetour] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [userCity, setUserCity] = useState('Votre position');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if(data.city) setUserCity(data.city);
      }).catch(() => {});
  }, []);
  
  if (!dest) return <div className="p-20 text-center">Destination introuvable</div>;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateAller) return;
    if (tripType === 'aller-retour' && !dateRetour) return;
    
    const flight = mockFlights[0] as Flight;
    const basePrice = tripType === 'aller-retour' ? parseInt(dest.priceRange) : parseInt(dest.priceRange) * 0.6;
    
    const customFlight: Flight = {
      ...flight,
      arrival: { ...flight.arrival, code: dest.name.split(',')[0].toUpperCase().substring(0,3) },
      departure: { ...flight.departure, code: userCity.substring(0,3).toUpperCase() },
      price: Math.round(basePrice * passengers)
    };
    
    const dateStr = tripType === 'aller-retour' ? `${dateAller} au ${dateRetour}` : dateAller;
    
    setSearchParams({ from: `${userCity} (${tripType === 'aller-simple' ? 'Aller simple' : 'Aller-Retour'})`, to: dest.name, date: dateStr, passengers });
    setSelectedFlight(customFlight);
    navigate('/checkout');
  };

  const calculatedPrice = (tripType === 'aller-retour' ? parseInt(dest.priceRange) : parseInt(dest.priceRange) * 0.6) * passengers;

  return (
    <div className="w-full">
      {/* Hero Destination */}
      <div className="relative h-[60vh] overflow-hidden mb-16 shadow-2xl">
        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-6 md:left-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">{dest.name}</h1>
          <p className="text-2xl text-brand-500 font-bold flex items-center gap-2 drop-shadow-lg"><MapPin size={24}/> Séjour Premium</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
        {/* Info & Perks */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-8 text-white">L'expérience</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-12">{dest.desc}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {['Accès VIP Exclusif', 'Transfert Privé Aéroport', 'Conciergerie 24/7', 'Petit-déjeuner Inclus'].map((perk, i) => (
              <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl">
                <CheckCircle className="text-brand-500" size={24} />
                <span className="font-bold text-white">{perk}</span>
              </div>
            ))}
          </div>
          
          <div className="glass-card p-8 mb-8 flex items-center gap-8 border-l-4 border-l-brand-500">
            <div className="bg-brand-500/20 p-5 rounded-full">
              <Plane className="text-brand-500" size={40} />
            </div>
            <div>
              <p className="text-slate-400 mb-1 text-lg">Vol estimé depuis <strong className="text-white">{userCity}</strong></p>
              <p className="text-3xl font-extrabold text-white">À partir de {dest.priceRange} € <span className="text-base font-normal text-slate-400">/ pers. (A/R)</span></p>
            </div>
          </div>
        </div>
        
        {/* Reservation Widget */}
        <div className="lg:w-[450px]">
          <form onSubmit={handleBook} className="glass-card p-8 sticky top-28 shadow-2xl border-brand-500/20">
            <h3 className="text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4">Réservez vos dates</h3>
            
            {/* Cheap Dates Hint */}
            <div className="bg-brand-500/10 border border-brand-500/30 p-4 rounded-xl flex gap-3 mb-6">
              <Sparkles className="text-brand-500 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-brand-100 leading-relaxed">
                <strong className="text-brand-500">Astuce Prix :</strong> Les vols pour {dest.name} sont généralement <span className="font-bold underline">moins chers en {dest.cheapMonth}</span>. Profitez-en !
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Trip Type Toggle */}
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl">
                <button type="button" onClick={() => setTripType('aller-retour')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${tripType === 'aller-retour' ? 'bg-brand-500 text-ink shadow-md' : 'text-slate-400 hover:text-white'}`}>Aller-Retour</button>
                <button type="button" onClick={() => setTripType('aller-simple')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${tripType === 'aller-simple' ? 'bg-brand-500 text-ink shadow-md' : 'text-slate-400 hover:text-white'}`}>Aller Simple</button>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2 font-semibold uppercase tracking-wider">Date aller</label>
                <div className="flex items-center glass rounded-xl px-4 py-4 border border-slate-700 focus-within:border-brand-500 transition-colors">
                  <CalendarIcon className="text-brand-500 mr-4" size={24} />
                  <input type="date" required value={dateAller} onChange={e => setDateAller(e.target.value)} className="bg-transparent w-full outline-none text-white text-lg font-bold [color-scheme:dark]" />
                </div>
              </div>
              
              {tripType === 'aller-retour' && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2 font-semibold uppercase tracking-wider">Date retour</label>
                  <div className="flex items-center glass rounded-xl px-4 py-4 border border-slate-700 focus-within:border-brand-500 transition-colors">
                    <CalendarIcon className="text-brand-500 mr-4" size={24} />
                    <input type="date" required value={dateRetour} onChange={e => setDateRetour(e.target.value)} className="bg-transparent w-full outline-none text-white text-lg font-bold [color-scheme:dark]" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-semibold uppercase tracking-wider">Passagers</label>
                <div className="flex items-center glass rounded-xl px-4 py-4 border border-slate-700 focus-within:border-brand-500 transition-colors">
                  <Users className="text-brand-500 mr-4" size={24} />
                  <input type="number" min="1" required value={passengers} onChange={e => setPassengers(parseInt(e.target.value))} className="bg-transparent w-full outline-none text-white text-lg font-bold" />
                </div>
              </div>

              {(dateAller && (tripType === 'aller-simple' || dateRetour)) && (
                <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-6 text-center mt-8 animate-[fadeUp_0.3s_ease-out]">
                  <p className="text-sm text-brand-400 mb-2 font-bold uppercase tracking-widest">Offre disponible</p>
                  <p className="text-4xl font-extrabold text-white">{Math.round(calculatedPrice)} €</p>
                  <p className="text-sm font-normal text-slate-400 mt-1">Prix total ({tripType === 'aller-simple' ? 'Aller simple' : 'A/R'}) pour {passengers} passager(s)</p>
                </div>
              )}
              
              <button type="submit" className="w-full bg-brand-500 text-ink font-bold py-5 rounded-xl hover:bg-brand-400 transition-all shadow-[0_5px_15px_rgba(205,162,96,0.2)] text-lg mt-8 flex justify-center items-center gap-2">
                Continuer vers le paiement <Plane size={20}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
