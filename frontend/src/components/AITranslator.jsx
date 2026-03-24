import React, { useState, useEffect, useRef } from "react";
import { translateTextRequest } from "../services/api";

const AITranslator = () => {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Español");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "SISTEMA OMNISELF: Traductor médico activo. ¿Qué protocolo o suplemento deseas traducir hoy?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencia para scroll automático al último mensaje
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleTranslate = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await translateTextRequest(inputText, targetLanguage);
      if (response.success) {
        setMessages((prev) => [...prev, { role: "ai", text: response.data }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "ERROR DE PROTOCOLO: Fallo en la conexión con el núcleo. 🔌" },
      ]);
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col h-[75vh] px-4 mt-8">
      {/* VENTANA DE CHAT - Glassmorphism Style */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 mb-6 shadow-2xl custom-scrollbar"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative p-4 rounded-2xl max-w-[85%] md:max-w-[70%] text-sm leading-relaxed border transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-50 text-right rounded-tr-none shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  : "bg-slate-800/50 border-white/5 text-slate-200 rounded-tl-none"
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 opacity-50 ${msg.role === 'user' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {msg.role === 'user' ? 'User_Subject' : 'OmniSelf_AI'}
              </span>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-800/30 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
              <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-tighter">
                Procesando Bio-Data...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ÁREA DE CONTROL - Input Moderno */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            className="flex-1 bg-slate-950/50 border border-white/5 rounded-2xl p-4 text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/50 transition-colors resize-none text-sm"
            placeholder="Introduce el texto científico o médico..."
            rows="2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleTranslate())}
          />

          <div className="flex md:flex-col gap-3 min-w-[160px]">
            <select
              className="flex-1 p-3 rounded-xl bg-slate-950 border border-white/5 text-slate-300 text-xs outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              disabled={isLoading}
            >
              <option value="Español">Español (ES)</option>
              <option value="Inglés">Inglés (EN)</option>
              <option value="Portugués">Portugués (PT)</option>
              <option value="Francés">Francés (FR)</option>
            </select>

            <button
              onClick={handleTranslate}
              className={`py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                isLoading 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Syncing..." : "Traducir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITranslator;
