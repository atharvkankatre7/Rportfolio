import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './App.css';

function App() {
    return (
        <div className="app">
            {/* Animated Background Blobs */}
            <div className="bg-blob bg-blob-1"></div>
            <div className="bg-blob bg-blob-2"></div>
            <div className="bg-blob bg-blob-3"></div>

            <Navbar />
            <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <Contact />
            </main>
        </div>
    );
}

export default App;
