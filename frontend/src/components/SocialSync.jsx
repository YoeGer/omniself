import React, { useState } from "react";
import { generateSocialPost } from "../services/api";
import toast from 'react-hot-toast';

const SocialSync = () => {
  const [formData, setFormData] = useState({
    topic: "",
    tone: "profesional",
    platform: "LinkedIn",
    goals: "generar autoridad y valor",
  });
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    toast.success("Publicación copiada al portapapeles", {
      icon: "🚀",
      duration: 3000,
    });
  };

  const handleGenerate = async () => {
    if (!formData.topic) return toast.error("Escribe una idea primero");

    setLoading(true);
    try {
      const postText = await generateSocialPost(formData);
      setGeneratedPost(postText);
      toast.success("Post generado con éxito");
    } catch (err) {
      toast.error("Error al conectar con la IA");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-black text-white mb-8 italic uppercase tracking-tighter">
        Social <span className="text-emerald-400">Publisher</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <textarea
            placeholder="¿De qué quieres hablar hoy? Suelta tus ideas aquí..."
            className="w-full h-48 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-slate-300 focus:border-emerald-500 outline-none transition-all"
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
          />
          <div className="flex gap-4">
            <select
              className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-400"
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
            >
              <option>LinkedIn</option>
              <option>X (Twitter)</option>
              <option>Instagram</option>
            </select>
            <select
              className="bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-300 outline-none focus:border-emerald-500"
              onChange={(e) =>
                setFormData({ ...formData, tone: e.target.value })
              }
            >
              <option value="liderazgo-pensamiento">
                🧠 Thought Leadership (Autoridad)
              </option>
              <option value="corporativo-moderno">
                🏢 Corporativo Moderno
              </option>
              <option value="educativo-tutorial">
                📖 Educativo / Tutorial
              </option>

              <option value="biohacker-disruptivo">
                🚀 Biohacker Disruptivo
              </option>
              <option value="developer-technical">💻 Técnico</option>
              <option value="minimalista-esencial">
                🫧 Minimalista / Esencial
              </option>

              <option value="storytelling-vulnerable">
                🌱 Storytelling / Vulnerable
              </option>
              <option value="motivacional-estoico">
                ⚖️ Motivacional Estoico
              </option>
              <option value="humor-sarcasmo">🎭 Humor / Sarcástico</option>

              <option value="copy-persuasivo">📈 Copywriting Persuasivo</option>
              <option value="lanzamiento-hype">🔥 Hype / Lanzamiento</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {loading ? "PROCESANDO PENSAMIENTOS..." : "GENERAR PUBLICACIÓN"}
          </button>
        </div>
        <div className="relative">
          {generatedPost ? (
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl p-6 h-full flex flex-col justify-between">
              <p className="text-slate-300 text-sm whitespace-pre-line font-light leading-relaxed">
                {generatedPost}
              </p>
              <button
                onClick={copyToClipboard}
                className="mt-6 text-[10px] font-mono text-emerald-500 border border-emerald-500/30 px-4 py-2 rounded-full hover:bg-emerald-500/10 transition-all self-end"
              >
                COPIAR CONTENIDO
              </button>
            </div>
          ) : (
            <div className="border border-white/5 rounded-2xl h-full flex items-center justify-center text-slate-600 italic text-sm">
              Tu post aparecerá aquí...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialSync;
