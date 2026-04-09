import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatTraductor from "./components/AITranslator";
import ProtocolAdvisor from "./components/ProtocolAdvisor";
import Navbar from "./components/NavBar";
import AvatarGenerator from "./components/AvatarGenerator";
import BioNutrition from "./components/BioNutrition";
import SocialSync from "./components/SocialSync";
import { Toaster } from "react-hot-toast";

function App() {
  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem("omniself_avatar_url") || null;
  });

  const [showAvatarModal, setShowAvatarModal] = useState(false);

  useEffect(() => {
    if (avatarUrl) {
      localStorage.setItem("omniself_avatar_url", avatarUrl);
    }
  }, [avatarUrl]);

  return (
    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#020617",
            color: "#f8fafc",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "1rem",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar
          avatarUrl={avatarUrl}
          onOpenAvatar={() => setShowAvatarModal(true)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                hasAvatar={!!avatarUrl}
                avatarUrl={avatarUrl}
                onOpenAvatar={() => setShowAvatarModal(true)}
              />
            }
          />
          <Route path="/translator" element={<ChatTraductor />} />
          <Route path="/social" element={<SocialSync />} />
          <Route path="/protocols" element={<ProtocolAdvisor />} />
          <Route path="/nutrition" element={<BioNutrition />} />
        </Routes>
        {showAvatarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
            <div className="relative w-full max-w-4xl animate-in zoom-in-95 duration-300">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="absolute -top-12 right-0 text-slate-500 hover:text-white font-mono text-[10px] tracking-[0.3em]"
              >
                [ CERRAR ESCANEO × ]
              </button>
              <AvatarGenerator
                onAvatarGenerated={(url) => {
                  setAvatarUrl(url);
                  setTimeout(() => setShowAvatarModal(false), 1500);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
