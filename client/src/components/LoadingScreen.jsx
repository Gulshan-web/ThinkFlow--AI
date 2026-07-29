import { motion } from "framer-motion";

function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">

            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "linear",
                }}
                className="
                    h-20
                    w-20
                    rounded-full
                    border-4
                    border-cyan-500
                    border-t-transparent
                "
            />

            <p className="absolute mt-40 text-xl text-white">
                AI is generating your mind map...
            </p>

        </div>
    );
}

export default LoadingScreen;