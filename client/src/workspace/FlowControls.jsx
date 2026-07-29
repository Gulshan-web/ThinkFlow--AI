import { Controls } from "reactflow";

import { motion } from "framer-motion";
function FlowControls() {
    const controlStyle = {
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    };
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <Controls
                position="bottom-right"
                showZoom={true}
                showFitView={true}
                showInteractive={true}
                style={controlStyle}
            />
        </motion.div>
    );

}
export default FlowControls;