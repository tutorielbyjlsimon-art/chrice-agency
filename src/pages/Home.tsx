import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Car, MapPin, Calendar, Users, Search, ShieldCheck, Gem, Headset, Star } from 'lucide-react';

export const destinations = [
  { id: 'paris', name: 'Paris, France', img: './assets/dest_paris_1781704263239.jpg', desc: 'La ville lumière vous attend pour un séjour romantique inoubliable.' },
  { id: 'kyoto', name: 'Kyoto, Japon', img: './assets/dest_kyoto_1781704278607.jpg', desc: "Plongez dans l'harmonie et la beauté sereine des temples ancestraux." },
  { id: 'maldives', name: 'Les Maldives', img: './assets/dest_maldives_1781704294035.jpg', desc: 'Bungalows luxueux sur des eaux turquoise pour une détente absolue.' },
  { id: 'dubai', name: 'Dubaï, EAU', img: './assets/dl_asset_1781709133130_1.jpg', desc: 'Le luxe futuriste et le shopping de classe mondiale au cœur du désert.' },
  { id: 'newyork', name: 'New York, USA', img: './assets/dl_asset_1781709136346_2.jpg', desc: 'La ville qui ne dort jamais, de Broadway à Central Park.' },
  { id: 'bali', name: 'Bali, Indonésie', img: './assets/dl_asset_1781709139379_3.jpg', desc: 'Retraite spirituelle, plages de rêve et nature luxuriante.' }
];

export const Home = () => {
  const navigate = useNavigate();
  const [userCity, setUserCity] = useState('Localisation en cours...');
  const [activeTab, setActiveTab] = useState('vols');
  
  // Search state
  const [searchDest, setSearchDest] = useState('');
  const [tripType, setTripType] = useState('aller-retour');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if(data.city) setUserCity(`${data.city}, ${data.country_name}`);
        else setUserCity('Paris, France');
      })
      .catch(() => setUserCity('Paris, France'));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchDest) {
      const found = destinations.find(d => d.name.toLowerCase().includes(searchDest.toLowerCase()));
      if (found) navigate(`/destination/${found.id}?type=${tripType}`);
      else navigate(`/destination/paris?type=${tripType}`);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col -mt-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 px-4 pb-20">
        <div className="absolute inset-0 z-0">
          <img src="./assets/hero_bg_1781704222367.jpg" alt="Hero" className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/50 to-ink"></div>
        </div>
        
        <div className="z-10 max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl">L'évasion à l'état pur.</h1>
          <p className="text-xl text-slate-300 mb-8">
            Découvrez nos offres exclusives au départ de <span className="text-brand-500 font-bold">{userCity}</span>.
          </p>
        </div>

        {/* Booking.com Style Search Box */}
        <div className="z-10 w-full max-w-5xl bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-white/10 pb-4 gap-4">
            <div className="flex gap-2">
              <button onClick={() => setActiveTab('vols')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'vols' ? 'bg-brand-500 text-ink' : 'text-slate-300 hover:bg-white/10'}`}><Plane size={20}/> Vols</button>
              <button onClick={() => setActiveTab('hotels')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'hotels' ? 'bg-brand-500 text-ink' : 'text-slate-300 hover:bg-white/10'}`}><Building size={20}/> Hôtels</button>
              <button onClick={() => setActiveTab('voitures')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'voitures' ? 'bg-brand-500 text-ink' : 'text-slate-300 hover:bg-white/10'}`}><Car size={20}/> Voitures</button>
            </div>
            
            {/* Trip Type Toggle */}
            <div className="flex items-center gap-6 px-4">
              <label className="flex items-center gap-2 text-sm font-bold text-white cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tripType === 'aller-retour' ? 'border-brand-500' : 'border-slate-400 group-hover:border-brand-500'}`}>
                  {tripType === 'aller-retour' && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>}
                </div>
                <input type="radio" className="hidden" checked={tripType === 'aller-retour'} onChange={() => setTripType('aller-retour')} />
                Aller-retour
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-white cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tripType === 'aller-simple' ? 'border-brand-500' : 'border-slate-400 group-hover:border-brand-500'}`}>
                  {tripType === 'aller-simple' && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>}
                </div>
                <input type="radio" className="hidden" checked={tripType === 'aller-simple'} onChange={() => setTripType('aller-simple')} />
                Aller simple
              </label>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 glass flex items-center px-4 py-3 rounded-2xl">
              <MapPin className="text-brand-500 mr-3" size={24} />
              <div className="w-full">
                <label className="block text-xs font-bold text-slate-400">Destination</label>
                <input type="text" value={searchDest} onChange={e => setSearchDest(e.target.value)} placeholder="Où allez-vous ?" className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 font-bold text-lg" required />
              </div>
            </div>
            
            <div className="flex-1 glass flex items-center px-4 py-3 rounded-2xl">
              <Calendar className="text-brand-500 mr-3" size={24} />
              <div className="w-full flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-400">Aller</label>
                  <input type="date" required className="w-full bg-transparent text-white outline-none font-bold text-lg [color-scheme:dark]" />
                </div>
                {tripType === 'aller-retour' && (
                  <div className="flex-1 border-l border-white/10 pl-2">
                    <label className="block text-xs font-bold text-slate-400">Retour</label>
                    <input type="date" required className="w-full bg-transparent text-white outline-none font-bold text-lg [color-scheme:dark]" />
                  </div>
                )}
              </div>
            </div>

            <div className="glass flex items-center px-4 py-3 rounded-2xl md:w-48">
              <Users className="text-brand-500 mr-3" size={24} />
              <div className="w-full">
                <label className="block text-xs font-bold text-slate-400">Passagers</label>
                <input type="number" min="1" defaultValue="2" className="w-full bg-transparent text-white outline-none font-bold text-lg" />
              </div>
            </div>

            <button type="submit" className="bg-brand-500 text-ink px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-brand-400 transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Search size={24} /> Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Marketing Section : Pourquoi nous choisir */}
      <section className="py-20 bg-surface/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-white">Pourquoi voyager avec Chrice-Agency ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card p-8 text-center flex flex-col items-center hover:-translate-y-2 transition-transform">
              <div className="bg-brand-500/20 p-4 rounded-full mb-6 text-brand-500"><Gem size={40} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Luxe & Exclusivité</h3>
              <p className="text-slate-400 text-sm">Accédez à des hôtels 5 étoiles et des vols prestigieux que vous ne trouverez nulle part ailleurs.</p>
            </div>
            <div className="glass-card p-8 text-center flex flex-col items-center hover:-translate-y-2 transition-transform">
              <div className="bg-brand-500/20 p-4 rounded-full mb-6 text-brand-500"><ShieldCheck size={40} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Meilleurs Prix Garantis</h3>
              <p className="text-slate-400 text-sm">Notre technologie exclusive compare des milliers de tarifs pour vous offrir l'excellence au juste prix.</p>
            </div>
            <div className="glass-card p-8 text-center flex flex-col items-center hover:-translate-y-2 transition-transform">
              <div className="bg-brand-500/20 p-4 rounded-full mb-6 text-brand-500"><Headset size={40} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Assistance 24/7</h3>
              <p className="text-slate-400 text-sm">Un conseiller dédié vous accompagne avant, pendant et après votre séjour, peu importe le fuseau horaire.</p>
            </div>
            <div className="glass-card p-8 text-center flex flex-col items-center hover:-translate-y-2 transition-transform">
              <div className="bg-brand-500/20 p-4 rounded-full mb-6 text-brand-500"><Star size={40} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Avis Vérifiés</h3>
              <p className="text-slate-400 text-sm">+ de 50 000 voyageurs satisfaits. Note moyenne de 4.9/5 sur TrustPilot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-extrabold mb-16 text-center">Inspirations pour votre prochain voyage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map(d => (
            <div key={d.id} onClick={() => navigate(`/destination/${d.id}`)} className="glass-card overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-400 hover:border-brand-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="h-64 overflow-hidden relative">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">{d.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-400 mb-4">{d.desc}</p>
                <span className="text-brand-500 font-bold text-sm uppercase tracking-widest group-hover:underline">Explorer →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
