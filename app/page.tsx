import Hero from "@/components/Hero";
import AudienceSplit from "@/components/AudienceSplit";
import AppShowcase from "@/components/AppShowcase";
import CoffeeVisual from "@/components/CoffeeVisual";
import GlobeSection from "@/components/GlobeSection";
import HowItWorks from "@/components/HowItWorks";
import ShopOwners from "@/components/ShopOwners";
import FounderStory from "@/components/FounderStory";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AudienceSplit />
      <AppShowcase />
      <CoffeeVisual />
      <GlobeSection />
      <HowItWorks />
      <ShopOwners />
      <FounderStory />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
