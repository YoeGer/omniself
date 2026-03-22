import './index.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ChatTraductor from './components/ChatTraductor';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* 1. Parte Superior */}
      <Header />
      
      {/* 2. Contenido Principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col">
        <NavBar />
        
        {/* Aquí renderizamos el traductor, luego podremos intercambiarlo */}
        <section className="flex-1 animate-in fade-in duration-700">
          <ChatTraductor />
        </section>
      </main>

      {/* 3. Parte Inferior */}
      <Footer />
    </div>
  );
}

export default App;