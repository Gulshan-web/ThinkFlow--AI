import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

function HeroButtons() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
            >
                <Link
                    to="/workspace"
                    className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300"
                >
                    Generate Mind Map

                    <ArrowRight size={20} />
                </Link>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-lg transition hover:bg-white/10"
            >
                <PlayCircle size={22} />

                Watch Demo
            </motion.button>
        </div>
    );
}

export default HeroButtons;