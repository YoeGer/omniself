import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent italic tracking-tighter">
            OMNISELF AI
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-[0.2em]">
            Human Optimization Protocol v1.0.4
          </p>
        </div>

        <div className="flex gap-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Privacidad</a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Protocolos</a>
          <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Soporte</a>
        </div>

        <p className="text-[10px] text-slate-600 font-mono">
          © 2026 / EST. SAN FRANCISCO, CBA.
        </p>
      </div>
    </footer>
  );
};

export default Footer;