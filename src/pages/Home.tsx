import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import PricingSection from "../components/home/PricingSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/home/Footer";

const Home = () => {
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
};

export default Home;
