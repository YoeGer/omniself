import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ avatarUrl, onOpenAvatar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Dashboard', path: '/' }, 
    { name: 'Traductor', path: '/translator' },
    { name: 'Social', path: '/social' },
    { name: 'Protocolos', path: '/protocols' },
    { name: 'Nutrición', path: '/nutrition' },
  ];

  return (
    <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-xl font-bold tracking-tighter text-white">
            OMNISELF<span className="text-emerald-400 font-light">.BIO</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 relative py-2
                ${isActive(link.path) 
                  ? 'text-emerald-400 opacity-100 font-bold' 
                  : 'text-slate-500 hover:text-slate-200 opacity-70'
                }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-in slide-in-from-bottom-1"></span>
              )}
            </Link>
          ))}
          <button 
            onClick={onOpenAvatar}
            className={`relative w-9 h-9 rounded-full border transition-all duration-500 overflow-hidden bg-slate-900 flex items-center justify-center
              ${isActive('/avatar') ? 'border-emerald-400 ring-2 ring-emerald-500/20' : 'border-white/10 hover:border-emerald-500/50'}
            `}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Nav Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm">👤</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;