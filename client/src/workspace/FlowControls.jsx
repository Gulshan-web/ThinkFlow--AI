import { Controls } from "reactflow";
import { motion } from "framer-motion";

function FlowControls() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 20,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.35,
            }}
            className="
                rounded-2xl
                border
                border-white/10
                bg-slate-900/80
                p-2
                shadow-[0_20px_45px_rgba(0,0,0,.35)]
                backdrop-blur-2xl
            "
        >
            <Controls
                position="bottom-right"
                showZoom
                showFitView
                showInteractive

                style={{
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    color: "#ffffff",
                }}
            />
        </motion.div>
    );
}

export default FlowControls;