import React, { useState } from "react";
import { translateTextRequest } from "../services/api";

const ChatTraductor = () => {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Español");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "¡Hola! Soy OmniSelf Translator. ¿Qué texto quieres traducir hoy?",
    },
  ]);

  // --- NUEVO ESTADO: Controla si estamos esperando a la IA ---
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Usamos el servicio profesional
      const response = await translateTextRequest(inputText, targetLanguage);

      if (response.success) {
        const aiMsg = { role: "ai", text: response.data };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Lo siento, no pude conectar con el cerebro de OmniSelf. 🔌",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col h-[80vh]">
      {/* VENTANA DE CHAT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/30 rounded-omnixl border border-white/50 mb-6 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`os-card !p-4 max-w-[75%] ${
                msg.role === "user"
                  ? "bg-brand-primary text-white border-none"
                  : "bg-white"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* --- RENDERIZADO CONDICIONAL DEL SPINNER --- */}
        {/* Si isLoading es true, mostramos este bloque. Si es false, React lo ignora. */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-slate-500 font-medium">
                OmniSelf está traduciendo...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ÁREA DE CONTROL */}
      <div className="os-card space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            className="os-input flex-1"
            placeholder="Pega aquí el texto..."
            rows="2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading} // Deshabilitamos para que no escriba mientras carga
          />

          <div className="flex flex-row md:flex-col gap-2 justify-between">
            <select
              className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              disabled={isLoading}
            >
              <option value="Español">A Español</option>
              <option value="Inglés">A Inglés</option>
              <option value="Portugués">A Portugués</option>
              <option value="Francés">A Francés</option>
            </select>

            <button
              onClick={handleTranslate}
              className={`btn-primary w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Pensando..." : "Traducir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTraductor;
