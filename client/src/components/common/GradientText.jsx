import { motion } from "framer-motion";

function GradientText({ children }) {
    return (
        <motion.span
            initial={{
                backgroundPosition: "0% 50%",
            }}
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
            }}
            className="
        inline-block
        bg-gradient-to-r
        from-cyan-400
        via-indigo-400
        to-purple-400
        bg-[length:200%_200%]
        bg-clip-text
        text-transparent
      "
        >
            {children}
        </motion.span>
    );
}

export default GradientText;