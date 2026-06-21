import Hero from "@/components/Hero";
import CoffeeVisual from "@/components/CoffeeVisual";
import AudienceSplit from "@/components/AudienceSplit";
import SocialFeed from "@/components/SocialFeed";
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
      <HowItWorks />
      <ShopOwners />
      <FounderStory />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
