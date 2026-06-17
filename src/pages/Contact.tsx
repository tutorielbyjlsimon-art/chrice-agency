import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="text-5xl font-extrabold mb-12 text-white text-center">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="glass-card p-8 flex items-start gap-6">
            <div className="bg-brand-500/20 p-4 rounded-full text-brand-500"><Phone size={32}/></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Téléphone</h3>
              <p className="text-slate-400">Assistance 24/7 pour les membres Premium.</p>
              <p className="text-brand-500 font-bold mt-2 text-xl">+33 1 00 00 00 00</p>
            </div>
          </div>

          <div className="glass-card p-8 flex items-start gap-6">
            <div className="bg-brand-500/20 p-4 rounded-full text-brand-500"><Mail size={32}/></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
              <p className="text-slate-400">Nous répondons généralement sous 2 heures.</p>
              <p className="text-brand-500 font-bold mt-2 text-xl">contact@chrice-agency.com</p>
            </div>
          </div>

          <div className="glass-card p-8 flex items-start gap-6">
            <div className="bg-brand-500/20 p-4 rounded-full text-brand-500"><MapPin size={32}/></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Bureaux</h3>
              <p className="text-slate-400">Venez discuter de vos projets de voyage autour d'un café.</p>
              <p className="text-brand-500 font-bold mt-2 text-xl">Avenue des Rêves, Paris</p>
            </div>
          </div>
        </div>

        <form className="glass-card p-10 flex flex-col gap-6" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <h2 className="text-3xl font-bold text-white mb-4">Envoyez-nous un message</h2>
          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Send size={64} className="text-brand-500 mb-6" />
              <h3 className="text-2xl font-bold text-white">Message Envoyé !</h3>
              <p className="text-slate-400 mt-2">Notre équipe vous recontactera très vite.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Nom Complet</label>
                <input required type="text" className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Email</label>
                <input required type="email" className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Message</label>
                <textarea required rows={5} className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-500 text-ink font-bold py-4 rounded-xl hover:bg-brand-400 transition-all shadow-lg mt-4 flex justify-center items-center gap-2">
                Envoyer <Send size={20}/>
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
