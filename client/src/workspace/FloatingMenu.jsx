import { motion } from "framer-motion";

import {
    Plus,
    Sparkles,
    Download,
    Trash2,
} from "lucide-react";

import useMindMap from "../hooks/useMindMap";

function FloatingMenu() {
    const {
        addNode,
        clearCanvas,
        exportJSON,
        selectedNode,
        expandNodeAI,
    } = useMindMap();
    const handleAddNode = () => {
        addNode();
    };

    const handleAI = () => {
        if (!selectedNode) {
            alert("Please select a node first.");
            return;
        }

        expandNodeAI(selectedNode.id);
    };

    const handleExport = () => {
        exportJSON();
    };

    const handleClear = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to clear the entire mind map?"
        );

        if (confirmDelete) {
            clearCanvas();
        }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: 0.4,
            }}
            className="
        fixed
        bottom-8
        right-8
        z-50
        flex
        flex-col
        gap-4
      "
        >
            <FloatingButton
                icon={<Plus size={22} />}
                title="Add Node"
                color="from-cyan-500 to-blue-500"
                onClick={handleAddNode}
            />

            <FloatingButton
                icon={<Sparkles size={22} />}
                title="AI Generate"
                color="from-purple-500 to-pink-500"
                onClick={handleAI}
            />

            <FloatingButton
                icon={<Download size={22} />}
                title="Export"
                color="from-green-500 to-emerald-500"
                onClick={handleExport}
            />

            <FloatingButton
                icon={<Trash2 size={22} />}
                title="Clear Canvas"
                color="from-red-500 to-rose-500"
                onClick={handleClear}
            />
        </motion.div>
    );
}

function FloatingButton({
    icon,
    title,
    color,
    onClick,
}) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={`
        h-14
        w-14
        rounded-full
        bg-gradient-to-r
        ${color}
        text-white
        shadow-2xl
        transition-all
        duration-300
        hover:scale-110
        hover:rotate-6
        active:scale-95
        flex
        items-center
        justify-center
      `}
        >
            {icon}
        </button>
    );
}

export default FloatingMenu;