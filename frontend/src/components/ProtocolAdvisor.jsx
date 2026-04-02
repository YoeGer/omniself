import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getProtocolAdviceRequest } from "../services/api";

const ReportRenderer = ({ content }) => {
  return (
    <div
      className="w-full bg-slate-900/80 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] 
                    shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                    prose prose-invert max-w-none
                    prose-headings:text-cyan-400 prose-headings:font-light
                    prose-strong:text-brand-secondary prose-strong:font-bold
                    prose-p:text-slate-300 prose-p:text-base prose-p:leading-relaxed
                    prose-li:text-slate-300
                    hover:border-brand-primary/30 transition-colors duration-500"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

const ProtocolAdvisor = () => {
  //ESTADOS CON INICIALIZACIÓN DESDE LOCALSTORAGE
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("omniself_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [threadId, setThreadId] = useState(() => {
    return localStorage.getItem("omniself_thread_id") || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  //PERSISTENCIA AUTOMÁTICA
  useEffect(() => {

    localStorage.setItem("omniself_messages", JSON.stringify(messages));

    if (threadId) {
      localStorage.setItem("omniself_thread_id", threadId);
    }

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, threadId]);

  //FUNCIÓN DE RESET (NUEVA CONSULTA)
  const handleNewConsultation = () => {
    setMessages([]);
    setThreadId(null);
    setQuestion("");

    localStorage.removeItem("omniself_messages");
    localStorage.removeItem("omniself_thread_id");

    console.log("♻️ Sesión reiniciada: Hilo y mensajes eliminados.");
  };

  const handleConsult = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    const userText = question;
    setQuestion("");

    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    try {
      //Pasamos el threadId (si es null, el backend creará uno nuevo)
      const response = await getProtocolAdviceRequest(userText, threadId);

      if (response.success) {
        //Actualizamos el threadId con el que nos devuelva el servidor
        setThreadId(response.data.threadId);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.reply },
        ]);
      }
    } catch (err) {
      console.error("Error en la consulta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr,380px] gap-8 mt-12">
      <main className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 shadow-2xl shadow-cyan-500/5 flex flex-col min-h-[600px]">
        <header className="border-b border-white/5 pb-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <span className="text-brand-primary">📊</span> Reporte Biométrico
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Núcleo de Inteligencia OmniSelf
            </p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-[10px] text-brand-primary font-mono tracking-[0.2em] animate-pulse">
              <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
              SINCRO...
            </div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar flex flex-col">
          {messages.length === 0 && !isLoading && (
            <div className="my-auto flex flex-col items-center opacity-20">
              <div className="text-7xl mb-4">🔬</div>
              <p className="font-mono text-xs tracking-widest uppercase">
                Sistema listo para análisis
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              {msg.role === "user" ? (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-slate-900 border border-cyan-500/30 text-slate-100 text-sm px-5 py-3 rounded-2xl rounded-tr-none shadow-xl">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 ml-2 mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
                      Análisis de Protocolo Finalizado
                    </span>
                  </div>
                  <ReportRenderer content={msg.content} />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="bg-slate-800/20 border border-white/5 p-8 rounded-omnixl animate-pulse text-slate-500 font-mono text-xs">
              Generando reporte de optimización...
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </main>
      <aside className="space-y-6">
        <div className="os-card bg-slate-900 border border-white/10 shadow-xl p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
            <span className="text-brand-secondary">⚡</span> Control
          </h3>
          <textarea
            className="os-input w-full bg-slate-950/50 border-white/5 focus:border-brand-primary/40 min-h-[150px] p-4 text-sm rounded-xl text-slate-200"
            placeholder="¿Qué quieres saber sobre tu protocolo?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={handleConsult}
            className="btn-primary w-full mt-4 bg-brand-primary py-3 rounded-xl font-bold hover:brightness-110 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Analizando..." : "Ejecutar Análisis"}
          </button>

          {messages.length > 0 && (
            <button
              onClick={handleNewConsultation} 
              className="w-full mt-6 text-[10px] text-slate-500 hover:text-red-400 transition-colors tracking-[0.2em] font-mono border-t border-white/5 pt-4"
            >
              [ INICIAR NUEVA CONSULTA ]
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ProtocolAdvisor;
