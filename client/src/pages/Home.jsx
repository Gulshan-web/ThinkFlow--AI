import Navbar from "../components/layout/Navbar";

import Hero from "../components/hero/Hero";

import FeatureSection from "../components/ui/FeatureSection";

import StatsSection from "../components/ui/StatsSection";

import CTASection from "../components/ui/CTASection";

import PremiumFooter from "../components/ui/PremiumFooter";

function Home() {
    return (
        <div
            className="
        min-h-screen
        bg-[#030712]
        text-white
        overflow-x-hidden
      "
        >
            {/* Navbar */}

            <Navbar />

            {/* Hero */}

            <Hero />

            {/* Features */}

            <FeatureSection />

            {/* Statistics */}

            <StatsSection />

            {/* CTA */}

            <CTASection />

            {/* Footer */}

            <PremiumFooter />
        </div>
    );
}

export default Home;