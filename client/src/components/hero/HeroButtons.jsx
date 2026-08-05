import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function HeroButtons() {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
            >
                <Link
                    to="/workspace"
                    className="
                        inline-flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-gradient-to-r
                        from-cyan-500
                        via-indigo-500
                        to-purple-500
                        px-8
                        py-4
                        font-semibold
                        text-white
                        shadow-xl
                        shadow-cyan-500/30
                        transition-all
                        duration-300
                    "
                >
                    Generate Mind Map
                    <ArrowRight size={20} />
                </Link>
            </motion.div>
        </div>
    );
}

export default HeroButtons;