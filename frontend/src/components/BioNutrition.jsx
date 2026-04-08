import React, { useState } from "react";
import { generateNutritionPlanRequest } from "../services/api";

const STEPS = [
  { id: 1, title: "Biometría", icon: "⚖️" },
  { id: 2, title: "Restricciones", icon: "🚫" },
  { id: 3, title: "Objetivos", icon: "🎯" },
  { id: 4, title: "Resultado", icon: "📊" },
];

const BioNutrition = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "female",
    activity: "moderate",
    goal: "longevity",
    mealsPerDay: "3",
    allergies: "",
    dietType: "omnivore",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await generateNutritionPlanRequest(formData);
      if (response.success) {
        setPlan(response.data);
        setStep(4);
      }
    } catch (error) {
      console.error("Error al generar el plan nutricional", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">
          BIO-<span className="text-emerald-400">NUTRICION</span>
        </h1>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
          Sistema de Optimización Metabólica
        </p>

        <div className="flex items-center gap-4 mt-8">
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s.id ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-slate-800"}`}
              />
              <span
                className={`text-[10px] font-mono ${step === s.id ? "text-emerald-400" : "text-slate-600"}`}
              >
                0{s.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-10">
        <div className="os-card bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl min-h-[500px] flex flex-col">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  01
                </span>
                Análisis Biométrico
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Peso (kg)
                  </label>
                  <input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    className="os-input w-full"
                    placeholder="70"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Altura (cm)
                  </label>
                  <input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    className="os-input w-full"
                    placeholder="175"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Edad
                  </label>
                  <input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="os-input w-full"
                    placeholder="28"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Género
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="os-input w-full"
                  >
                    <option value="female">Femenino</option>
                    <option value="male">Masculino</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  02
                </span>
                Filtros Biológicos
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Tipo de Dieta
                  </label>
                  <select
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleChange}
                    className="os-input w-full"
                  >
                    <option value="omnivore">Omnívora (Estándar)</option>
                    <option value="ketogenic">
                      Keto (Baja en carbohidratos)
                    </option>
                    <option value="vegan">Vegana</option>
                    <option value="vegetarian">Vegetariana</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Alergias, Intolerancias o alimentos que prefiero no comer
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="os-input w-full min-h-[120px] pt-4"
                    placeholder="Ej: Gluten, Lactosa..."
                  />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  03
                </span>
                Optimización Final
              </h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Nivel de Actividad Física
                  </label>
                  <select
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    className="os-input w-full"
                  >
                    <option value="sedentary">Sedentario</option>
                    <option value="moderate">
                      Moderado (3-4 días entrenamiento)
                    </option>
                    <option value="high">Atleta (6+ días entrenamiento)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Frecuencia de Comidas Diarias
                  </label>
                  <div className="flex gap-4">
                    {["2", "3", "4", "5"].map((num) => (
                      <button
                        key={num}
                        onClick={() =>
                          setFormData({ ...formData, mealsPerDay: num })
                        }
                        className={`flex-1 py-3 rounded-xl border font-mono transition-all ${formData.mealsPerDay === num ? "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/10"}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">
                    Objetivo Principal
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "fat_loss", label: "Adelgazar (Déficit)" },
                      { id: "muscle_gain", label: "Subir Peso (Músculo)" },
                      { id: "longevity", label: "Longevidad (Salud)" },
                      { id: "cognitive_focus", label: "Enfoque Cognitivo" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setFormData({ ...formData, goal: g.id })}
                        className={`p-4 rounded-xl border text-left text-xs transition-all ${formData.goal === g.id ? "bg-emerald-500/20 border-emerald-500 text-white" : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10"}`}
                      >
                        {g.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && plan && (
            <div className="animate-in zoom-in-95 duration-500 space-y-10">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-3xl font-black text-emerald-400 uppercase tracking-tighter">
                    Protocolo 7 Días
                  </h2>
                  <p className="text-slate-500 font-mono text-[10px] mt-1">
                    {plan.resumen_semanal}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-[10px] font-mono text-emerald-500 hover:text-white border border-emerald-500/30 px-3 py-1 rounded-full transition-all"
                >
                  NUEVO CÁLCULO
                </button>
              </div>

              <div className="space-y-12">
                {plan.dias.map((dia, idx) => (
                  <div key={idx} className="relative">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm text-emerald-400 border border-emerald-500/20">
                        {dia.nombre[0]}
                      </span>
                      {dia.nombre}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {dia.comidas.map((comida, cIdx) => (
                        <div
                          key={cIdx}
                          className="group bg-slate-950/40 border border-white/5 p-5 rounded-2xl hover:border-emerald-500/30 transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <span className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest">
                                {comida.momento}
                              </span>
                              <h4 className="text-lg font-semibold text-slate-200 mt-1">
                                {comida.plato}
                              </h4>
                              <p className="text-xs text-slate-500 mt-2">
                                <span className="text-emerald-400/50">
                                  Ingredientes:
                                </span>{" "}
                                {comida.ingredientes.join(", ")}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {Object.entries(comida.macros).map(([m, val]) => (
                                <div
                                  key={m}
                                  className="bg-slate-900 border border-white/5 px-3 py-2 rounded-xl text-center min-w-[55px]"
                                >
                                  <span className="block text-[8px] font-mono text-slate-600 uppercase">
                                    {m}
                                  </span>
                                  <span className="text-xs font-bold text-emerald-400">
                                    {val}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step < 4 && (
            <div className="mt-auto pt-10 flex justify-between items-center border-t border-white/5">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-mono tracking-widest"
                >
                  &lt; REGRESAR
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-50"
              >
                {loading
                  ? "ANALIZANDO BIOMASA..."
                  : step === 3
                    ? "GENERAR PROTOCOLO"
                    : "SIGUIENTE"}
              </button>
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <div className="p-6 border border-emerald-500/10 rounded-[2rem] bg-emerald-500/5">
            <p className="text-[11px] text-emerald-400/70 leading-relaxed italic">
              "La nutrición no es solo combustible; es información que
              reprograma tu genética cada vez que comes."
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BioNutrition;
