import { Link } from 'react-router-dom';

const features = [
  {
    title: "AI Translator",
    desc: "Traduce términos médicos y suplementos con precisión clínica.",
    path: "/translator",
    icon: "🧬",
    color: "border-emerald-500/30 hover:border-emerald-500"
  },
  {
    title: "Protocol Advisor",
    desc: "Consulta tu base de conocimiento personalizada sobre suplementación y optimización.",
    path: "/protocols", 
    icon: "🔬",
    color: "border-cyan-500/30 hover:border-cyan-500 shadow-cyan-500/5"
  },
  {
    title: "Bio-Nutrition",
    desc: "Próximamente: Analiza tu dieta según tu tipo de sangre.",
    path: "#",
    icon: "🥗",
    color: "border-slate-700 opacity-50 cursor-not-allowed"
  },
];

const Home = ({ hasAvatar, avatarUrl, onOpenAvatar }) => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <header className="text-center mb-16 flex flex-col items-center">
        {hasAvatar ? (
          <div className="mb-8 group relative cursor-pointer" onClick={onOpenAvatar}>
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
             <img 
               src={avatarUrl} 
               alt="Bio Avatar" 
               className="relative w-32 h-32 rounded-full border-2 border-white/10 object-cover"
             />
             <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono tracking-widest text-white">EDITAR</span>
             </div>
          </div>
        ) : (
          <div className="mb-12 w-full max-w-2xl bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-12 animate-pulse-slow">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Perfil Biométrico Incompleto</h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-md mx-auto">
              Detectamos una falta de identidad visual. Genera tu avatar con DALL-E para personalizar tu experiencia de optimización.
            </p>
            <button 
              onClick={onOpenAvatar}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              Generar Identidad
            </button>
          </div>
        )}

        <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          OMNISELF
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Tu asistente inteligente para la optimización humana y el bienestar avanzado.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Link 
            key={i} 
            to={f.path}
            className={`p-6 rounded-2xl border bg-slate-900/50 backdrop-blur-xl transition-all duration-300 group ${f.color}`}
          >
            <span className="text-4xl mb-4 block">{f.icon}</span>
            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
              {f.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {f.desc}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;