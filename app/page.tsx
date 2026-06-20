import Hero from "@/components/Hero";
import CoffeeVisual from "@/components/CoffeeVisual";
import AudienceSplit from "@/components/AudienceSplit";
import SocialFeed from "@/components/SocialFeed";
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
      <CoffeeVisual />
      <AudienceSplit />
      <SocialFeed />
      <GlobeSection />
      <HowItWorks />
      <ShopOwners />
      <FounderStory />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
