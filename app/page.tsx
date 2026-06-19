import Hero from "@/components/Hero";
import AudienceSplit from "@/components/AudienceSplit";
import CoffeeVisual from "@/components/CoffeeVisual";
import GlobeSection from "@/components/GlobeSection";
import HowItWorks from "@/components/HowItWorks";
import ShopOwners from "@/components/ShopOwners";
import FounderNote from "@/components/FounderNote";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AudienceSplit />
      <CoffeeVisual />
      <GlobeSection />
      <HowItWorks />
      <ShopOwners />
      <FounderNote />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
