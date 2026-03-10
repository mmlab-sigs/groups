import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Mission from './sections/Mission';
import ResearchDirections from './sections/ResearchDirections';
import News from './sections/News';
import Publications from './sections/Publications';
import Team from './sections/Team';
import JoinUs from './sections/JoinUs';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Mission />
        <ResearchDirections />
        <News />
        <Publications />
        <Team />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
