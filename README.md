# 🧬 OmniSelf: Neural Biohacking Ecosystem

**OmniSelf** es una plataforma **Fullstack** de alto rendimiento diseñada para la optimización humana. No es solo un dashboard de salud; es un ecosistema que integra **Inteligencia Artificial Multimodal** (Texto, Voz e Imagen) para gestionar la nutrición, la mentalidad y la marca personal desde un enfoque de ingeniería de software avanzada.

---

## 🚀 Arquitectura y Desafíos Técnicos

Este proyecto demuestra solvencia técnica en la resolución de problemas complejos de integración y flujos asíncronos:

* **Streaming de Audio Neuronal:** Implementación de `OpenAI TTS-1` mediante el manejo de **Buffers** en Node.js y **Blobs** en el Frontend. Se resolvieron desafíos de comunicación mediante la configuración de cabeceras personalizadas (`Access-Control-Expose-Headers`) para la sincronización de metadatos de audio.
* **Gestión de Contexto Multimodal:** Orquestación de `GPT-4o` para lógica de negocio, `GPT-4o mini` para procesamiento de lenguaje natural y `DALL-E 3` para la generación de identidad visual persistente.
* **Social Content Engineering:** Módulo de generación de contenido con inyección dinámica de prompts según tono, plataforma y objetivos, optimizando el *storytelling* técnico para marca personal.
* **UX/UI de Alto Impacto:** Dashboard reactivo construido con **React** y **Tailwind CSS**, priorizando la velocidad de respuesta y el feedback inmediato mediante sistemas de notificaciones asíncronas (`react-hot-toast`).

---

## ✨ Módulos Core (Integraciones de IA)

| Módulo | Tecnología IA | Propósito Técnico |
| :--- | :--- | :--- |
| **Neural Awakening** | `OpenAI TTS` | Ritual matutino con streaming de voz y sincronización de texto. |
| **Social Sync** | `GPT-4o Mini` | Ghostwriter de marca personal con selección de tono y plataforma. |
| **Bio-Nutrition** | `GPT-4o` | Generación de protocolos basados en biometría y restricciones. |
| **Scientific Translator** | `OpenAI API` | Localización de terminología médica y técnica con precisión clínica. |
| **Evolution Avatar** | `DALL-E 3` | Pipeline de generación de imagen para identidad visual del usuario. |

---

## 🛠️ Stack Tecnológico

### **Backend (The Engine)**
* **Node.js & Express:** Arquitectura escalable basada en servicios y controladores.
* **OpenAI SDK:** Implementación de modelos avanzados y manejo de hilos.
* **Seguridad:** Gestión de variables de entorno y sanitización de inputs.

### **Frontend (The Interface)**
* **React.js:** SPA con hooks personalizados para el manejo de estados complejos.
* **Tailwind CSS:** Diseño *Glassmorphism* moderno enfocado en dashboards de alta densidad.
* **Axios:** Cliente HTTP configurado para respuestas tipo `blob` y manejo de interceptores.

---

## 🔧 Instalación y Setup

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/YoeGer/omniself.git
    ```
2.  **Instala las dependencias:**
    ```bash
    # Instalar dependencias del backend
    cd backend && npm install

    # Instalar dependencias del frontend
    cd ../frontend && npm install
    ```
3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la carpeta `backend` con tu `OPENAI_API_KEY`.
4.  **Inicia el entorno de desarrollo:**
    ```bash
    # Ejecuta desde la raíz si tienes un script configurado o en cada carpeta
    npm run dev
    ```

---

## 👤 Autora
**Yoana (YoeGer)** - **Full Stack Developer**

---

### 💡 Nota para Reclutadores
Este proyecto es una prueba de concepto sólida sobre mi capacidad para:
1.  Consumir e integrar múltiples APIs de IA de forma eficiente.
2.  Resolver problemas de comunicación **Front-to-Back** (CORS, Buffers, Blobs).
3.  Diseñar interfaces de usuario modernas, funcionales y orientadas a resultados.
