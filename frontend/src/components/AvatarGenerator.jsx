import React, { useState } from "react";
import { generateAvatarRequest } from "../services/api";

const AVATAR_OPTIONS = {
  gender: [
    { id: "female", label: "Mujer" },
    { id: "male", label: "Hombre" },
    { id: "other", label: "Otro" },
  ],
  hairType: [
    { id: "short_straight", label: "Corto y Liso" },
    { id: "short_curly", label: "Corto y Rizado" },
    { id: "long_curly", label: "Largo y Rizado" },
    { id: "long_straight", label: "Largo y Liso" },
    { id: "bob_cut", label: "Corte Bob" },
    { id: "shaved", label: "Rapado" },
  ],
  hairColor: [
    { id: "black", label: "Negro" },
    { id: "blonde", label: "Rubio" },
    { id: "brown", label: "Castaño" },
    { id: "red", label: "Pelirrojo" },
  ],
};

const AvatarGenerator = ({ onAvatarGenerated }) => {
  const [selections, setSelections] = useState({
    gender: "female",
    hairType: "long_straight",
    hairColor: "brown",
  });
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (category, value) => {
    setSelections((prev) => ({ ...prev, [category]: value }));
  };

  const handleGenerate = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await generateAvatarRequest(selections);

      if (response.success) {
        setGeneratedUrl(response.data.avatarUrl);
        onAvatarGenerated(response.data.avatarUrl);
      }
    } catch (error) {
      alert("Error al conectar con el servicio de diseño.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-100 flex items-center justify-center gap-3">
          <span className="text-brand-primary">🧬</span> Generador Biomórfico
        </h2>
        <p className="text-slate-400 mt-2">
          Configura tu perfil físico para Yoana
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          {Object.entries(AVATAR_OPTIONS).map(([key, options]) => (
            <div key={key}>
              <h4 className="text-xs uppercase font-mono tracking-[0.3em] text-slate-500 mb-4">
                {key}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionChange(key, opt.id)}
                    className={`p-4 rounded-xl border text-sm transition-all duration-300 flex items-center gap-3
                                ${
                                  selections[key] === opt.id
                                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-lg shadow-brand-primary/10"
                                    : "bg-slate-950/30 border-white/5 text-slate-400 hover:border-white/10"
                                }`}
                  >
                    {opt.icon && <span className="text-xl">{opt.icon}</span>}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn-primary w-full bg-brand-primary text-slate-950 font-bold py-4 rounded-2xl hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                {" "}
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>{" "}
                Sincronizando...{" "}
              </>
            ) : (
              "Generar Identidad Biométrica"
            )}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-white/5 pl-10">
          <div className="relative w-72 h-72 rounded-full p-2 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/10">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border-2 border-white/5">
              {isLoading ? (
                <div className="font-mono text-xs text-brand-primary animate-pulse tracking-widest">
                  [ RENDERIZANDO... ]
                </div>
              ) : generatedUrl ? (
                <img
                  src={generatedUrl}
                  alt="Avatar Generado"
                  className="w-full h-full object-cover animate-fade-in transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <div className="text-8xl opacity-10">👤</div>
              )}
            </div>
            <div className="absolute -inset-10 border border-brand-primary/10 rounded-full animate-pulse opacity-30 pointer-events-none"></div>
          </div>

          {generatedUrl && (
            <p className="text-xs text-green-400 font-mono mt-6 tracking-[0.1em]">
              [ IDENTIDAD CONFIRMADA ]
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
