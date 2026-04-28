import Navbar from "./components/Navbar";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import FeatureSection from "./components/FeatureSection";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />

      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default App;
