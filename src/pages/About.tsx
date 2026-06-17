import React from 'react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="text-5xl font-extrabold mb-10 text-white">À Propos de <span className="text-brand-500">Chrice-Agency</span></h1>
      <div className="glass-card p-10 space-y-6 text-lg text-slate-300 leading-relaxed">
        <p>
          Fondée sur la promesse de l'excellence, Chrice-Agency est plus qu'une simple plateforme de réservation. Nous sommes les architectes de vos moments les plus précieux.
        </p>
        <p>
          Notre mission est de redéfinir l'évasion en vous donnant accès aux destinations les plus exclusives du globe, tout en garantissant un niveau de service et de confort absolu. Notre vaste réseau mondial nous permet de vous offrir les meilleurs tarifs sans jamais compromettre le luxe.
        </p>
        <h2 className="text-3xl font-bold text-white mt-10 mb-4 border-l-4 border-brand-500 pl-4">Notre Philosophie</h2>
        <p>
          L'évasion à l'état pur n'est pas qu'un slogan, c'est notre standard. Nous croyons que le vrai luxe réside dans l'absence de friction. C'est pourquoi chaque étape de votre réservation et de votre voyage est pensée pour être aussi fluide et mémorable que la destination elle-même.
        </p>
      </div>
    </div>
  );
};
