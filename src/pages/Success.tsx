import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CheckCircle, Download, ArrowRight, Calendar, MapPin } from 'lucide-react';

export const Success = () => {
  const { state, formatPrice } = useBooking();
  const [pnr] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());

  if (!state.passengerInfo || !state.selectedFlight) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-white">Session expirée</h2>
        <Link to="/" className="text-brand-500 hover:underline ml-4">Retour</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6 text-center py-10">
      <div className="mb-8 flex justify-center">
        <div className="w-28 h-28 rounded-full bg-emerald-500/20 border-4 border-emerald-500/30 flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
          <CheckCircle size={72} className="text-emerald-500" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Paiement Réussi !</h1>
      <p className="text-xl text-slate-300 mb-10">
        Merci <span className="text-white font-bold">{state.passengerInfo.firstName}</span>. Votre voyage vers <span className="text-brand-500 font-bold">{state.selectedFlight.arrival.code}</span> est confirmé.
      </p>

      <div className="glass-card p-0 mb-10 relative overflow-hidden text-left bg-white/5 border border-emerald-500/20">
        <div className="bg-emerald-500/10 px-8 py-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-white text-lg flex items-center gap-2"><CheckCircle className="text-emerald-500" size={20}/> Réservation Confirmée</h3>
          <div className="bg-emerald-500 text-white font-mono text-sm px-4 py-1 rounded-full font-bold">
            PNR: {pnr}
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-sm text-slate-400 mb-1 font-semibold uppercase tracking-wider">Contact Principal</p>
              <p className="font-bold text-xl text-white mb-1">{state.passengerInfo.firstName} {state.passengerInfo.lastName}</p>
              <p className="text-slate-400">{state.passengerInfo.email}</p>
              
              <div className="mt-8">
                <p className="text-sm text-slate-400 mb-1 font-semibold uppercase tracking-wider">Paiement</p>
                <p className="font-bold text-xl text-emerald-500">{formatPrice(state.selectedFlight.price)}</p>
              </div>
            </div>
            
            <div className="bg-ink/50 p-6 rounded-2xl border border-white/5">
              <p className="text-sm text-slate-400 mb-4 font-semibold uppercase tracking-wider">Détails du Vol</p>
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-brand-500" />
                <div>
                  <p className="text-white font-bold">{state.selectedFlight.departure.code} → {state.selectedFlight.arrival.code}</p>
                  <p className="text-sm text-slate-400">{state.selectedFlight.airline}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="text-brand-500" />
                <div>
                  <p className="text-white font-bold">{state.searchParams?.date || 'Date non spécifiée'}</p>
                  <p className="text-sm text-slate-400">{state.searchParams?.passengers || 2} Passager(s)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-brand-500/10 border border-brand-500/30 p-5 rounded-xl text-left">
            <h4 className="text-brand-500 font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle size={16}/> Adhésion Chrice-Agency VIP Confirmée</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Félicitations, vous êtes désormais membre de notre club VIP exclusif. Votre adhésion est valide pour une durée de <strong>12 mois maximum</strong>. Vous serez notifié par email avant le prochain renouvellement.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors backdrop-blur-md">
          <Download size={20} /> Télécharger la Facture
        </button>
        <Link to="/" className="flex items-center justify-center gap-2 bg-brand-500 text-ink px-8 py-4 rounded-full font-bold hover:bg-brand-400 transition-all hover:-translate-y-1 shadow-lg">
          Retour à l'accueil <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};
