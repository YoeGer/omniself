import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const menuItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Traductor', path: '/translator', icon: '🌐' },
    { name: 'Bio-Nutrición', path: '#', icon: '🥗', disabled: true },
    { name: 'Avatar IA', path: '#', icon: '🤖', disabled: true },
  ];

  return (
    <nav className="sticky top-6 z-50 flex justify-center w-full px-4">
      <div className="bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1 shadow-2xl shadow-emerald-500/10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2
              ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
              ${isActive && !item.disabled
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'}
            `}
            onClick={(e) => item.disabled && e.preventDefault()}
          >
            <span>{item.icon}</span>
            <span className="hidden md:block">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;