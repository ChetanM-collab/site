import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Twin from "@/components/Twin";
import { profile } from "@/lib/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.linkedin,
  sameAs: [profile.linkedin],
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressLocality: "Sydney", addressCountry: "AU" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Walchand College of Engineering, Sangli",
  },
  knowsAbout: [
    "Core Java",
    "Spring Boot",
    "Apache Kafka",
    "MS SQL Server",
    "Foreign Exchange",
    "Machine Learning",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <CursorGlow />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Career />
        <Capabilities />
        <Portfolio />
        <Twin />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
