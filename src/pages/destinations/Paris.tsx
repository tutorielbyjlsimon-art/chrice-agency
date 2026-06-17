import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveLocalStatus } from '../../components/LiveLocalStatus';
import { useBooking } from '../../context/BookingContext';
import type { Flight } from '../../context/BookingContext';
import { Calendar as CalendarIcon, Users, MapPin, Plane, CheckCircle, Sparkles, Building, Map } from 'lucide-react';
import mockFlights from '../../mocks/mockFlights.json';

const hotels = [
  { id: 'h1', name: 'Le Meurice', stars: 5, price: 290, rating: 9.8, reviews: 342, img: '/chrice-agency/assets/paris_1.jpg', desc: "Face aux Tuileries, un palace à l'élégance du 18e siècle avec spa et gastronomie d'exception.", amenities: ['Douche effet pluie en marbre', 'TV 8K Invisible', 'Lit King Size sur-mesure'] },
  { id: 'h2', name: 'Plaza Athénée', stars: 5, price: 350, rating: 9.9, reviews: 512, img: '/chrice-agency/assets/paris_2.jpg', desc: "Le chic de la Haute Couture avenue Montaigne, avec une vue spectaculaire sur la Tour Eiffel.", amenities: ['Balcon privé Tour Eiffel', 'Produits de courtoisie Dior', 'Miroir TV intégré'] },
  { id: 'h3', name: 'Hôtel Lutetia', stars: 5, price: 180, rating: 9.4, reviews: 189, img: '/chrice-agency/assets/paris_3.jpg', desc: "La légende de la Rive Gauche, alliant architecture Art Déco et design ultra-contemporain.", amenities: ['Baignoire en marbre sculpté', 'Machine Nespresso Vertuo', 'Linge de maison en satin'] },
  { id: 'h4', name: 'The Peninsula Paris', stars: 5, price: 220, rating: 9.6, reviews: 275, img: '/chrice-agency/assets/paris_4.jpg', desc: "Le luxe absolu à deux pas de l'Arc de Triomphe, avec terrasses panoramiques secrètes.", amenities: ['Domotique iPad', 'Toilettes japonaises Toto', 'Dressing privatif'] }
];

const excursions = [
  { id: 'e1', name: 'Tour Privé de la Tour Eiffel avec accès sommet', price: 95 },
  { id: 'e2', name: 'Dîner Croisière Privé sur la Seine', price: 150 },
  { id: 'e3', name: 'Visite VIP du Louvre coupe-file & Dégustation', price: 120 }
];

export const Paris = () => {
  const navigate = useNavigate();
  const { state, setSearchParams, setSelectedFlight, formatPrice } = useBooking();
  
  const [tripType, setTripType] = useState('aller-retour');
  const [dateAller, setDateAller] = useState('');
  const [dateRetour, setDateRetour] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [userCity, setUserCity] = useState('Votre position');
  
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<number>(0);

  useEffect(() => {
    fetch('https://ipapi.co/json/').then(res => res.json()).then(data => { if(data.city) setUserCity(data.city); }).catch(() => {});
  }, []);

  const toggleExcursion = (id: string) => {
    if (selectedExcursions.includes(id)) setSelectedExcursions(selectedExcursions.filter(e => e !== id));
    else setSelectedExcursions([...selectedExcursions, id]);
  };

  const baseFlightPrice = tripType === 'aller-retour' ? 150 : 90;
  const flightTotal = baseFlightPrice * passengers;
  const hotelPrice = selectedHotel ? hotels.find(h => h.id === selectedHotel)!.price : 0;
  const hotelTotal = hotelPrice * 3; 
  const mealTotal = mealPlan * 3 * passengers;
  const excursionsTotal = selectedExcursions.reduce((acc, id) => acc + (excursions.find(e => e.id === id)!.price * passengers), 0);
  const totalPrice = flightTotal + hotelTotal + mealTotal + excursionsTotal;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateAller || !selectedHotel) return alert("Veuillez sélectionner vos dates et au moins un hôtel.");
    if (tripType === 'aller-retour' && !dateRetour) return;
    
    const flight = mockFlights[0] as Flight;
    const customFlight: Flight = {
      ...flight, arrival: { ...flight.arrival, code: 'PAR' }, departure: { ...flight.departure, code: userCity.substring(0,3).toUpperCase() },
      price: Math.round(totalPrice) 
    };
    
    setSearchParams({ from: `${userCity} (Vol + Hôtel)`, to: 'Paris, France', date: tripType === 'aller-retour' ? `${dateAller} au ${dateRetour}` : dateAller, passengers });
    setSelectedFlight(customFlight);
    navigate('/checkout');
  };

  return (
    <div className="w-full">
      <div className="relative h-[60vh] overflow-hidden mb-16 shadow-2xl">
        <img src="/chrice-agency/assets/dest_paris_1781704263239.jpg" alt="Paris" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-6 md:left-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">Paris, France</h1>
          <p className="text-2xl text-brand-500 font-bold flex items-center gap-2 drop-shadow-lg"><MapPin size={24}/> Séjour Premium Abordable</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-12 relative z-10">
        <LiveLocalStatus city="Paris" timezone="Europe/Paris" weather="sun" temp={22} />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6 text-white">La Ville Lumière</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-16">L'élégance à la française s'offre à vous. Profitez d'une architecture haussmannienne époustouflante, d'une gastronomie de renommée mondiale et des musées les plus prestigieux, à un prix abordable.</p>
          
          <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3"><Building className="text-brand-500"/> 1. Choisissez votre Palace</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {hotels.map(h => (
              <div key={h.id} onClick={() => setSelectedHotel(h.id)} className={`glass-card overflow-hidden cursor-pointer transition-all border-2 ${selectedHotel === h.id ? 'border-brand-500 shadow-[0_0_20px_rgba(205,162,96,0.3)] scale-[1.02]' : 'border-transparent hover:border-white/20'}`}>
                <img src={h.img} alt={h.name} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg text-white">{h.name}</h4>
                      <p className="text-brand-500 text-sm tracking-widest mb-2">{'★'.repeat(h.stars)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-white text-xl">{formatPrice(h.price)}</p>
                      <p className="text-xs text-slate-400">/nuit</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-center mb-3 flex-wrap">
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1"><CheckCircle size={12}/> Annulation Gratuite</span>
                    <span className="bg-brand-500/20 text-brand-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">★ {h.rating} ({h.reviews} avis)</span>
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">Wifi Gratuit</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3 mb-3">{h.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {h.amenities.map((amenity, i) => <span key={i} className="text-[10px] uppercase font-bold tracking-wider bg-white/10 text-brand-400 px-2 py-1 rounded-md">{amenity}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3"><Map className="text-brand-500"/> 2. Ajoutez vos Excursions</h3>
          <div className="grid grid-cols-1 gap-4 mb-16">
            {excursions.map(exc => (
              <div key={exc.id} onClick={() => toggleExcursion(exc.id)} className={`glass p-5 rounded-xl cursor-pointer transition-all flex justify-between items-center border-2 ${selectedExcursions.includes(exc.id) ? 'border-brand-500 bg-brand-500/10' : 'border-transparent hover:border-white/20'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${selectedExcursions.includes(exc.id) ? 'border-brand-500 bg-brand-500' : 'border-slate-400'}`}>
                    {selectedExcursions.includes(exc.id) && <CheckCircle size={16} className="text-ink" />}
                  </div>
                  <h4 className="font-bold text-white text-lg">{exc.name}</h4>
                </div>
                <p className="font-bold text-brand-500">+{formatPrice(exc.price)} <span className="text-xs font-normal text-slate-400">/pers</span></p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-[450px]">
          <form onSubmit={handleBook} className="glass-card p-8 sticky top-28 shadow-2xl border-brand-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Configurez votre voyage</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl">
                <button type="button" onClick={() => setTripType('aller-retour')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${tripType === 'aller-retour' ? 'bg-brand-500 text-ink shadow-md' : 'text-slate-400 hover:text-white'}`}>Aller-Retour</button>
                <button type="button" onClick={() => setTripType('aller-simple')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${tripType === 'aller-simple' ? 'bg-brand-500 text-ink shadow-md' : 'text-slate-400 hover:text-white'}`}>Aller Simple</button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-slate-400 mb-2 font-semibold">Aller</label>
                  <input type="date" required value={dateAller} onChange={e => setDateAller(e.target.value)} className="bg-transparent w-full outline-none text-white font-bold glass rounded-xl px-4 py-3 [color-scheme:dark]" />
                </div>
                {tripType === 'aller-retour' && (
                  <div className="flex-1">
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Retour</label>
                    <input type="date" required value={dateRetour} onChange={e => setDateRetour(e.target.value)} className="bg-transparent w-full outline-none text-white font-bold glass rounded-xl px-4 py-3 [color-scheme:dark]" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-semibold">Passagers</label>
                <div className="flex items-center glass rounded-xl px-4 py-3">
                  <Users className="text-brand-500 mr-4" size={20} />
                  <input type="number" min="1" required value={passengers} onChange={e => setPassengers(parseInt(e.target.value))} className="bg-transparent w-full outline-none text-white font-bold" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2 font-semibold">Formule Restauration</label>
                <select value={mealPlan} onChange={(e) => setMealPlan(Number(e.target.value))} className="w-full glass rounded-xl px-4 py-3 text-white font-bold outline-none [color-scheme:dark] appearance-none cursor-pointer">
                  <option value={0}>Petit-déjeuner inclus (+0)</option>
                  <option value={60}>Demi-pension (+{formatPrice(60)}/j/pers)</option>
                  <option value={110}>Pension complète (+{formatPrice(110)}/j/pers)</option>
                </select>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mt-6 border border-white/10">
                <h4 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Devis Estimé</h4>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-slate-400">Vols ({passengers}x)</span><span className="text-white">{formatPrice(flightTotal)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Hôtel (3 nuits)</span><span className="text-white">{selectedHotel ? formatPrice(hotelTotal) : '-'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Repas</span><span className="text-white">{formatPrice(mealTotal)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Excursions</span><span className="text-white">{formatPrice(excursionsTotal)}</span></div>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <span className="font-bold text-white">Total</span><span className="text-3xl font-extrabold text-brand-500">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <button type="submit" disabled={!selectedHotel} className={`w-full font-bold py-5 rounded-xl transition-all shadow-lg text-lg flex justify-center items-center gap-2 ${selectedHotel ? 'bg-brand-500 text-ink hover:bg-brand-400' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
                Commander <Plane size={20}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
