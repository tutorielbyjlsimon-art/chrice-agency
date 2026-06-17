import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#040508] border-t border-white/10 pt-16 pb-8 text-sm text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <h3 className="text-xl font-extrabold text-white mb-6">Chrice<span className="text-brand-500">Agency</span></h3>
          <p className="mb-4">Votre partenaire premium pour des expériences de voyage inoubliables à travers le monde.</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Notre Entreprise</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="hover:text-brand-500 transition-colors">À propos de nous</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Carrières</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Presse</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Investisseurs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Assistance</h4>
          <ul className="space-y-3">
            <li><Link to="/contact" className="hover:text-brand-500 transition-colors">Service Client & Contact</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">FAQ</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Politique d'annulation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Légal</h4>
          <ul className="space-y-3">
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Conditions Générales</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Politique de Confidentialité</Link></li>
            <li><Link to="#" className="hover:text-brand-500 transition-colors">Gérer les cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© 2026 Chrice-Agency. Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="cursor-pointer hover:text-white">Facebook</span>
          <span className="cursor-pointer hover:text-white">Instagram</span>
          <span className="cursor-pointer hover:text-white">Twitter</span>
        </div>
      </div>
    </footer>
  );
};
