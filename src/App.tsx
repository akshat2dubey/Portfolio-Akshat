import { lazy, Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { CursorGlow } from "./components/ui/CursorGlow";
import { useActiveSection } from "./hooks/useActiveSection";

// Global fixed 3D ambient field — lazy so WebGL never blocks first paint.
const AmbientScene = lazy(() => import("./components/three/AmbientScene"));
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { SecureBank } from "./components/sections/SecureBank";
import { Journey } from "./components/sections/Journey";
import { Achievements } from "./components/sections/Achievements";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const section = useActiveSection();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-night text-body">
      <ScrollProgress />
      <CursorGlow />
      <Suspense fallback={null}>
        <AmbientScene section={section} />
      </Suspense>
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
