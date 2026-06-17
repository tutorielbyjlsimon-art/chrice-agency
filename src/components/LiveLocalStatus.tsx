import React, { useState, useEffect } from 'react';
import { Clock, Sun, Moon, Map, Utensils, ShoppingBag, BedDouble, Camera, Coffee } from 'lucide-react';

interface LiveLocalStatusProps {
  city: string;
  timezone: string;
  weather: string;
  temp: number;
}

export const LiveLocalStatus: React.FC<LiveLocalStatusProps> = ({ city, timezone, weather, temp }) => {
  const [localTime, setLocalTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const targetTime = new Date(new Date().toLocaleString("en-US", {timeZone: timezone}));
        setLocalTime(targetTime);
      } catch (e) {
        setLocalTime(new Date());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [timezone]);

  if (!localTime) return null;

  const hour = localTime.getHours();
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  
  let suggestion = "";
  let Icon = Sun;

  if (hour >= 6 && hour < 10) {
    suggestion = "Le moment idéal pour un petit-déjeuner luxueux face au lever du soleil.";
    Icon = Coffee;
  } else if (hour >= 10 && hour < 13) {
    suggestion = "Parfait pour explorer les sites exclusifs et les merveilles locales.";
    Icon = Map;
  } else if (hour >= 13 && hour < 15) {
    suggestion = "L'heure d'un déjeuner gastronomique aux saveurs inoubliables.";
    Icon = Utensils;
  } else if (hour >= 15 && hour < 19) {
    suggestion = "Profitez d'un moment de détente au Spa ou d'une session shopping de créateurs.";
    Icon = ShoppingBag;
  } else if (hour >= 19 && hour < 22) {
    suggestion = "Savourez un dîner étoilé avec une vue panoramique époustouflante.";
    Icon = Camera;
  } else if (hour >= 22 || hour < 2) {
    suggestion = "Profitez de la vie nocturne huppée ou d'un cocktail dans un bar lounge privé.";
    Icon = Moon;
  } else {
    suggestion = "La ville dort... Reposez-vous dans le confort de votre suite 5 étoiles.";
    Icon = BedDouble;
  }

  return (
    <div className="glass-card mt-8 mb-12 p-6 flex flex-col md:flex-row items-center gap-6 animate-fade-in border-l-4 border-brand-500 shadow-2xl">
      <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6 w-full md:w-auto justify-center md:justify-start">
        <div className="bg-brand-500/20 p-3 rounded-full text-brand-500">
          <Clock size={28} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Heure Locale</p>
          <p className="text-3xl font-extrabold text-white">{hour}:{minutes}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6 w-full md:w-auto justify-center md:justify-start">
        <div className="text-4xl">{weather === 'sun' ? '☀️' : weather === 'cloud' ? '⛅' : '🌙'}</div>
        <div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Météo</p>
          <p className="text-2xl font-bold text-white">{temp}°C</p>
        </div>
      </div>

      <div className="flex-1 flex items-start gap-4 pt-2 md:pt-0">
        <div className="text-brand-500 mt-1 hidden sm:block"><Icon size={24} /></div>
        <div className="text-center md:text-left w-full">
          <p className="text-sm font-bold text-brand-500 mb-1">En ce moment à {city} :</p>
          <p className="text-slate-300 italic font-medium">"{suggestion}"</p>
        </div>
      </div>
    </div>
  );
};
