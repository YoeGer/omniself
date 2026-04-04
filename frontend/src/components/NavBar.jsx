import { Link } from 'react-router-dom';

const Navbar = ({ avatarUrl, onOpenAvatar }) => {
  return (
    <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tighter text-emerald-400">
          OMNISELF<span className="text-white font-light">.BIO</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/protocols" className="text-xs font-mono text-slate-400 hover:text-white uppercase tracking-widest">Protocolos</Link>
          <button 
            onClick={onOpenAvatar}
            className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-slate-900 flex items-center justify-center hover:border-emerald-500/50 transition-colors"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Nav Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">👤</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;