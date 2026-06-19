import Hero from "@/components/Hero";
import AudienceSplit from "@/components/AudienceSplit";
import ProductShowcase from "@/components/ProductShowcase";
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
      <ProductShowcase />
      <HowItWorks />
      <ShopOwners />
      <FounderNote />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
