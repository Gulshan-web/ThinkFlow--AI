import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

function Logo() {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
            }}
            className="flex items-center gap-3"
        >
            <motion.div
                animate={{
                    rotate: [0, 8, -8, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-cyan-500
          via-indigo-500
          to-purple-600
          shadow-lg
          shadow-cyan-500/30
        "
            >
                <BrainCircuit
                    size={24}
                    className="text-white"
                />
            </motion.div>

            <div className="leading-tight">
                <h2 className="text-xl font-extrabold tracking-wide text-white">
                    ThinkFlow
                </h2>

                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                    AI
                </p>
            </div>
        </motion.div>
    );
}

export default Logo;