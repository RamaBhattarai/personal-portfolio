import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SelectedWorkSection from "@/components/work/SelectedWorkSection";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/tech-stack/TechStackSection";
import NowSection from "@/components/now/NowSection";
import ChatWidget from "@/components/ChatWidget";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Marquee />
      <SelectedWorkSection />
      <ProcessSection />
      <TechStackSection />
      <NowSection />
      <ContactSection />
      <ChatWidget />
    </main>
  );
}
