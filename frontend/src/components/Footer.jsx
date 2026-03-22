import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 py-10 border-t border-slate-200 text-center">
      <p className="text-sm text-slate-400 font-medium">
        © 2026 OmniSelf AI • Tu centro de bienestar inteligente
      </p>
      <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
        <a href="#" className="hover:text-brand-primary transition">Privacidad</a>
        <a href="#" className="hover:text-brand-primary transition">Protocolos</a>
        <a href="#" className="hover:text-brand-primary transition">Soporte</a>
      </div>
    </footer>
  );
};

export default Footer;