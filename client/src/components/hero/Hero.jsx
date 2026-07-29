import { motion } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 pt-24">
            {/* Animated Background */}
            <HeroBackground />

            {/* Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="relative z-10 mx-auto max-w-7xl"
            >
                <HeroContent />
            </motion.div>
        </section>
    );
}

export default Hero;