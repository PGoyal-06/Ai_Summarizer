import Hero from "./components/Hero";
import Demo from "./components/Demo";
import PricingSection from "./components/PricingSection";

import "./App.css";

const App = () => {
  return (
    <main>
      <div className="div">
        <div className="gradient" />
      </div>

      <div className="app">
        <Hero />
        <Demo />
        <PricingSection />
      </div>
    </main>
  );
};

export default App;
