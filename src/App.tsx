import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { CursorGlow } from "./components/ui/CursorGlow";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { SecureBank } from "./components/sections/SecureBank";
import { Journey } from "./components/sections/Journey";
import { Achievements } from "./components/sections/Achievements";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-night text-body">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <SecureBank />
        <Journey />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
