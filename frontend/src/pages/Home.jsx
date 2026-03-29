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
  // Agrega más tarjetas aquí
];

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <header className="text-center mb-16">
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