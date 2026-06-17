import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import type { Flight } from '../../context/BookingContext';
import { Calendar as CalendarIcon, Users, MapPin, Plane, CheckCircle, Sparkles, Building, Map } from 'lucide-react';
import mockFlights from '../../mocks/mockFlights.json';

const hotels = [
  { id: 'b1', name: 'Ubud Hanging Gardens', stars: 5, price: 180, rating: 9.7, reviews: 2150, img: '/assets/bali_1.jpg', desc: "Immergé dans la jungle tropicale, célèbre pour ses piscines à débordement suspendues.", amenities: ['Piscine cascade privée', 'Lit à baldaquin', 'Douche ciel ouvert'] },
  { id: 'b2', name: 'The Edge Uluwatu', stars: 5, price: 250, rating: 9.8, reviews: 1100, img: '/assets/bali_2.jpg', desc: "Perché sur une falaise spectaculaire offrant une vue plongeante sur l'océan Indien.", amenities: ['Majordome attitré', 'Plancher de verre', 'Spa Cliff'] },
  { id: 'b3', name: 'Potato Head Suites', stars: 4, price: 120, rating: 9.3, reviews: 3400, img: '/assets/bali_3.jpg', desc: "L'art de vivre éco-responsable et branché en plein cœur de Seminyak.", amenities: ['Bar cocktail en chambre', 'Accès direct Beach Club', 'Design éthique'] },
  { id: 'b4', name: 'Padma Resort Ubud', stars: 4, price: 95, rating: 9.6, reviews: 4800, img: '/assets/bali_4.jpg', desc: "Un havre de paix familial avec la plus grande piscine chauffée de Bali.", amenities: ['Piscine 89 mètres', 'Club enfant inclus', 'Balcon panoramique'] }
];

const excursions = [
  { id: 'e1', name: 'Ascension du Mont Batur au lever du soleil', price: 40 },
  { id: 'e2', name: 'Journée Plongée avec les raies Manta', price: 85 },
  { id: 'e3', name: 'Bénédiction purificatrice au temple de l\'eau', price: 30 }
];

export const Bali = () => {
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

  const baseFlightPrice = tripType === 'aller-retour' ? 450 : 250;
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
      ...flight, arrival: { ...flight.arrival, code: 'DPS' }, departure: { ...flight.departure, code: userCity.substring(0,3).toUpperCase() },
      price: Math.round(totalPrice) 
    };
    
    setSearchParams({ from: `${userCity} (Vol + Hôtel)`, to: 'Bali, Indonésie', date: tripType === 'aller-retour' ? `${dateAller} au ${dateRetour}` : dateAller, passengers });
    setSelectedFlight(customFlight);
    navigate('/checkout');
  };

  return (
    <div className="w-full">
      <div className="relative h-[60vh] overflow-hidden mb-16 shadow-2xl">
        <img src="./assets/dl_asset_1781709139379_3.jpg" alt="Bali" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-6 md:left-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">Bali, Indonésie</h1>
          <p className="text-2xl text-brand-500 font-bold flex items-center gap-2 drop-shadow-lg"><MapPin size={24}/> L'île des Dieux</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6 text-white">Paradis Spirituel</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-16">Rizières verdoyantes, plages secrètes et spiritualité ambiante. L'escapade parfaite à des tarifs étonnamment accessibles.</p>
          
          <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3"><Building className="text-brand-500"/> 1. Choisissez votre Hébergement</h3>
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
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">Navette Aéroport Incluse</span>
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
                  <option value={0}>Petit-déjeuner local inclus (+0)</option>
                  <option value={25}>Demi-pension Indonésienne (+{formatPrice(25)}/j/pers)</option>
                  <option value={50}>Pension complète avec cocktails (+{formatPrice(50)}/j/pers)</option>
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
