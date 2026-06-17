import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { AlertCircle, CreditCard, ShieldCheck, User, Lock, Check } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { state, setPassengerInfo, formatPrice } = useBooking();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);
  const [paymentErrorMsg, setPaymentErrorMsg] = useState('');

  useEffect(() => {
    if (!state.selectedFlight) navigate('/');
  }, [state.selectedFlight, navigate]);

  if (!state.selectedFlight) return null;

  const validateEmail = (val: string) => {
    setEmail(val);
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) setEmailError('Format d\'email invalide');
    else setEmailError('');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) return;

    setIsProcessing(true);
    setTimeoutError(false);
    setPaymentErrorMsg('');
    
    setTimeout(() => {
      setIsProcessing(false);
      if (state.forcePaymentError) {
        setPaymentErrorMsg("Erreur: Paiement refusé par votre banque. Veuillez utiliser une autre carte.");
        return;
      }
      if (state.isOffline) {
        setTimeoutError(true);
        return;
      }
      setPassengerInfo({ firstName, lastName, email });
      navigate('/success');
    }, 2000);
  };

  const isFormValid = firstName && lastName && email && cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length >= 3 && !emailError;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-10">
      <h1 className="text-4xl font-extrabold text-white mb-8">Finaliser la réservation</h1>
      
      {(timeoutError || paymentErrorMsg) && (
        <div className="glass-card border-red-500 bg-red-500/10 p-5 mb-8 flex items-start gap-4">
          <AlertCircle className="text-red-500 mt-1" size={28} />
          <div>
            <h3 className="font-bold text-red-500 text-lg">{timeoutError ? 'Erreur Réseau' : 'Paiement Échoué'}</h3>
            <p className="text-red-200 mt-1">{timeoutError ? 'Vérifiez votre connexion internet et réessayez.' : paymentErrorMsg}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mb-20">
        
        {/* Left Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handlePayment} className="glass-card p-8 space-y-8">
            {/* Passenger */}
            <div>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-white"><User size={24} className="text-brand-500"/> 1. Informations Voyageur</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Prénom <span className="text-red-500">*</span></label>
                  <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Nom <span className="text-red-500">*</span></label>
                  <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-400 mb-2">Adresse Email <span className="text-red-500">*</span></label>
                <input required type="email" value={email} onChange={e => validateEmail(e.target.value)} className={`w-full glass rounded-xl px-4 py-3 text-white outline-none transition-colors ${emailError ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'}`} />
                {emailError && <p className="text-red-500 text-sm mt-2 font-bold">{emailError}</p>}
              </div>
            </div>

            {/* Payment */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-white"><CreditCard size={24} className="text-brand-500"/> 2. Paiement Sécurisé</h3>
              
              <div className="bg-orange-500/10 border border-orange-500/50 p-4 rounded-xl flex items-start gap-3 mb-6 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <AlertCircle className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-orange-500 uppercase tracking-widest text-sm mb-1">Attention : Mode Simulation</h4>
                  <p className="text-sm text-orange-200">
                    Ceci est une démonstration. <strong>N'entrez JAMAIS vos vraies informations de carte bancaire</strong>. Utilisez des chiffres factices (ex: 0000 0000 0000 0000).
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Numéro de carte factice <span className="text-red-500">*</span></label>
                  <input required type="text" maxLength={19} value={cardNumber} onChange={e => {
                    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                    let formatted = v.match(/.{1,4}/g)?.join(' ') || v;
                    setCardNumber(formatted);
                  }} className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors tracking-widest" placeholder="0000 0000 0000 0000" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-400 mb-2">Expiration <span className="text-red-500">*</span></label>
                    <input required type="text" maxLength={5} value={expiry} onChange={e => {
                      let v = e.target.value.replace(/[^0-9]/g, '');
                      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                      setExpiry(v);
                    }} placeholder="MM/AA" className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-400 mb-2">CVV <span className="text-red-500">*</span></label>
                    <input required type="text" maxLength={4} value={cvv} onChange={e => {
                      let v = e.target.value.replace(/[^0-9]/g, '');
                      setCvv(v);
                    }} placeholder="123" className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Summary */}
        <div className="lg:w-[400px]">
          <div className="glass-card p-6 sticky top-28">
            <h3 className="font-bold text-lg text-white mb-6 border-b border-white/10 pb-4">Résumé de la commande</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Vol {state.searchParams?.from?.includes('Aller simple') ? 'Aller simple' : 'Aller-Retour'}</span>
                <span className="text-white font-bold">{state.selectedFlight.departure.code} → {state.selectedFlight.arrival.code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Passagers</span>
                <span className="text-white font-bold">{state.searchParams?.passengers || 2}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Classe</span>
                <span className="text-brand-500 font-bold">Premium</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg text-white font-bold">Total à payer</span>
                <span className="text-3xl font-extrabold text-white">
                  {formatPrice(state.selectedFlight.price)}
                </span>
              </div>
              <p className="text-xs text-slate-400 text-right mt-1">Taxes et frais inclus</p>
            </div>

            <button form="checkout-form" type="submit" disabled={!isFormValid || isProcessing} className={`w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 transition-all shadow-lg ${isFormValid && !isProcessing ? 'bg-emerald-500 text-white hover:bg-emerald-400 hover:-translate-y-1' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
              {isProcessing ? <span className="animate-pulse flex items-center gap-2">Traitement...</span> : <><Lock size={20} /> Payer {formatPrice(state.selectedFlight.price)}</>}
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <Check size={14} className="text-emerald-500"/> Simulation SSL
            </div>

            <div className="mt-6 bg-brand-500/10 border border-brand-500/30 p-4 rounded-xl">
              <h4 className="text-brand-500 font-bold text-sm mb-1 flex items-center gap-2">Adhésion Chrice-Agency VIP</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                En finalisant cette réservation, vous bénéficiez de notre conciergerie VIP valable pour une durée de <strong>12 mois maximum</strong>. Vous serez notifié par email avant son renouvellement automatique.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
