import { motion } from "framer-motion";

function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Aurora Circle 1 */}
            <motion.div
                animate={{
                    x: [0, 80, -40, 0],
                    y: [0, -60, 60, 0],
                    scale: [1, 1.2, 1, 1.15, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-10 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
            />

            {/* Aurora Circle 2 */}
            <motion.div
                animate={{
                    x: [0, -100, 80, 0],
                    y: [0, 80, -40, 0],
                    scale: [1.1, 1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-10 right-10 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-[120px]"
            />

            {/* Aurora Circle 3 */}
            <motion.div
                animate={{
                    x: [0, 60, -60, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.25, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px]"
            />

            {/* Floating Particles */}
            {Array.from({ length: 30 }).map((_, index) => (
                <motion.span
                    key={index}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${2 + Math.random() * 5}px`,
                        height: `${2 + Math.random() * 5}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.5,
                    }}
                />
            ))}
        </div>
    );
}

export default AnimatedBackground;