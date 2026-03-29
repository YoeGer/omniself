import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getProtocolAdviceRequest } from "../services/api";

const ReportRenderer = ({ content }) => {
  return (
    <div
      className="w-full bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-omnixl 
                    prose prose-invert max-w-none
                    prose-headings:text-brand-primary prose-headings:font-bold
                    prose-strong:text-brand-secondary prose-strong:font-bold
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-li:text-slate-400 prose-li:marker:text-brand-primary
                    prose-hr:border-white/5"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

const ProtocolAdvisor = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleConsult = async () => {
    if (!question.trim() || isLoading) return;
    setIsLoading(true);

    const newUserMsg = { role: "user", content: question };
    const historyToSend = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await getProtocolAdviceRequest(question, historyToSend);
      if (response.success) {
        setMessages((prev) => [
          ...prev,
          newUserMsg,
          { role: "assistant", content: response.data },
        ]);
        setQuestion("");
      }
    } catch (err) {
      console.error("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr,380px] gap-8 mt-12">
      {/* MAIN PANEL */}
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
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} animate-fade-in`}
            >
              {msg.role === "user" ? (
                <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-100 text-[13px] px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg shadow-cyan-900/10">
                  {msg.content}
                </div>
              ) : (
                <div className="w-full">
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

      {/* SIDE CONTROL */}
      <aside className="space-y-6">
        <div className="os-card bg-slate-900 border border-white/10 shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
            <span className="text-brand-secondary">⚡</span> Control
          </h3>
          <textarea
            className="os-input bg-slate-950/50 border-white/5 focus:border-brand-primary/40 min-h-[150px] text-sm leading-relaxed"
            placeholder="Introduce consulta de protocolo..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={handleConsult}
            className="btn-primary w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Ejecutar Análisis"}
          </button>

          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="w-full mt-6 text-[9px] text-slate-600 hover:text-red-500 transition-colors tracking-[0.3em] font-mono"
            >
              [ COMENZAR NUEVA CONSULTA ]
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ProtocolAdvisor;
