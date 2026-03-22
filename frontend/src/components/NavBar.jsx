import React from 'react';

const Navbar = () => {
  // En el futuro, estos links usarán "React Router" para cambiar de página
  const menuItems = [
    { name: 'Traductor', icon: '🌐', active: true },
    { name: 'Bio-Nutrición', icon: '🥗', active: false },
    { name: 'Avatar IA', icon: '🤖', active: false },
    { name: 'Meditación', icon: '🧘', active: false },
  ];

  return (
    <nav className="flex justify-center my-6">
      <div className="bg-white/50 p-1.5 rounded-2xl border border-slate-200 flex gap-1 shadow-sm">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              item.active 
                ? 'bg-white shadow-sm text-brand-primary' 
                : 'text-slate-500 hover:text-brand-primary hover:bg-white/50'
            }`}
          >
            <span>{item.icon}</span>
            <span className="hidden sm:block">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;