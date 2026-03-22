import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
            O
          </div>
          <h1 className="text-xl font-bold tracking-tight text-brand-text">
            Omni<span className="text-brand-primary">Self</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Estado de IA</span>
            <span className="text-xs text-brand-primary font-medium flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              GPT-4o Online
            </span>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
            👤
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;