import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AudienceSplit from "@/components/AudienceSplit";
import ShopOwners from "@/components/ShopOwners";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <AudienceSplit />
      <ShopOwners />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
