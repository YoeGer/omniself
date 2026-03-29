import React, { useState } from "react";
import { getProtocolAdviceRequest } from "../services/api";

const ProtocolAdvisor = () => {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState(null); // Almacenamos la respuesta estructurada
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConsult = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    // Opcional: setAdvice(null); // Si quieres que la respuesta anterior desaparezca mientras carga la nueva

    try {
      const response = await getProtocolAdviceRequest(question);
      if (response.success) {
        setAdvice(response.data);

        // --- LA MEJORA DE UX AQUÍ ---
        setQuestion(""); // Limpiamos el campo de texto automáticamente
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(
        "Error de Sincronización: No se pudo conectar con el Núcleo de Protocolos.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr,350px] gap-8 mt-12">
      {/* PANEL PRINCIPAL: Resultados del Análisis */}
      <main className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-cyan-500/5 flex flex-col min-h-[500px]">
        <header className="border-b border-white/5 pb-5 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <span className="text-cyan-400">📊</span> Reporte de Optimización
              Biométrica
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Análisis basado en los Protocolos Oficiales de OmniSelf
            </p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-cyan-500 font-mono uppercase tracking-widest animate-pulse">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
              Sincronizando...
            </div>
          )}
        </header>

        {/* ÁREA DE RESULTADOS */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {isLoading && (
            <div className="space-y-4 text-center">
              <div className="text-6xl animate-spin-slow">🌀</div>
              <p className="text-slate-500 font-mono text-sm">
                Procesando consulta en el Núcleo de IA...
              </p>
            </div>
          )}

          {!isLoading && !advice && !error && (
            <div className="max-w-md space-y-4">
              <div className="text-6xl opacity-40">🔬</div>
              <h3 className="text-xl font-semibold text-slate-300">
                Esperando Consulta
              </h3>
              <p className="text-slate-500 text-sm">
                Utilice el panel de control lateral para realizar una pregunta
                sobre sus protocolos de suplementación o hábitos.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-red-400 max-w-lg">
              <p className="font-bold text-sm">❌ {error}</p>
            </div>
          )}

          {advice && (
            <div className="w-full text-left bg-slate-800/30 p-8 rounded-2xl border border-white/5 space-y-6">
              <p className="text-slate-200 text-base leading-relaxed whitespace-pre-line font-medium">
                {advice}
              </p>
              <div className="border-t border-white/5 pt-4 text-xs text-slate-600 font-mono">
                ID DE CONSULTA: OMNI-{Date.now().toString().slice(-6)} /
                VERIFICADO POR NÚCLEO IA V1.0
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PANEL LATERAL: Control de Consulta */}
      <aside className="space-y-6">
        <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Panel de Control
          </h3>
          <textarea
            className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 outline-none focus:border-cyan-500/50 transition-colors resize-none text-sm mb-4"
            placeholder="Ej: ¿Cuándo debo tomar el Magnesio?"
            rows="5"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={handleConsult}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
              isLoading
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Consultando..." : "Iniciar Análisis"}
          </button>
        </div>

        {/* Sugerencias de búsqueda (Nivel Senior: UX Mejorada) */}
        <div className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl text-xs text-slate-500 space-y-3">
          <p className="font-semibold text-slate-400 uppercase tracking-wider">
            Consultas Sugeridas:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>¿Cuál es la dosis de Creatina?</li>
            <li>¿Qué suplementos ayudan al sueño?</li>
            <li>¿Hay advertencias para el NMN?</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ProtocolAdvisor;
