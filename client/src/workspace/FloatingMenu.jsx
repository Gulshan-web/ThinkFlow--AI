import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Sparkles,
    Download,
    Trash2,
} from "lucide-react";

import { useState } from "react";

import useMindMap from "../hooks/useMindMap";

function FloatingMenu() {

    const {

        addNode,
        clearCanvas,
        exportJSON,
        selectedNode,
        expandNodeAI,

    } = useMindMap();

    const [hovered, setHovered] = useState(null);

    function handleAddNode() {

        addNode();

    }

    function handleAI() {

        if (!selectedNode) {

            alert("Please select a node first.");

            return;

        }

        expandNodeAI(selectedNode.id);

    }

    function handleExport() {

        exportJSON();

    }

    function handleClear() {

        if (
            window.confirm(
                "Clear entire workspace?"
            )
        ) {

            clearCanvas();

        }

    }

    const buttons = [

        {
            id: "add",

            title: "Add Node",

            color:
                "from-cyan-500 via-sky-500 to-blue-500",

            glow:
                "rgba(34,211,238,.45)",

            icon:
                <Plus size={22} />,

            action:
                handleAddNode,
        },

        {
            id: "ai",

            title: "AI Expand",

            color:
                "from-fuchsia-500 via-purple-500 to-indigo-500",

            glow:
                "rgba(168,85,247,.45)",

            icon:
                <Sparkles size={22} />,

            action:
                handleAI,
        },

        {
            id: "export",

            title: "Export",

            color:
                "from-emerald-500 via-green-500 to-teal-500",

            glow:
                "rgba(16,185,129,.45)",

            icon:
                <Download size={22} />,

            action:
                handleExport,
        },

        {
            id: "clear",

            title: "Clear Canvas",

            color:
                "from-red-500 via-rose-500 to-pink-500",

            glow:
                "rgba(239,68,68,.45)",

            icon:
                <Trash2 size={22} />,

            action:
                handleClear,
        },

    ];

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 60,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: .45,
            }}

            className="
                fixed
                bottom-8
                left-8
                z-[999]
            "

        >

            <div

                className="
                    relative

                    rounded-[28px]

                    border
                    border-white/10

                    bg-slate-900/70

                    p-3

                    backdrop-blur-3xl

                    shadow-[0_20px_80px_rgba(0,0,0,.45)]
                "

            >

                <div

                    className="
                        absolute
                        inset-0

                        rounded-[28px]

                        bg-gradient-to-b
                        from-white/10
                        to-transparent

                        pointer-events-none
                    "

                />

                <div className="relative flex flex-col gap-3">

                    {buttons.map((button) => (

                        <FloatingButton

                            key={button.id}

                            {...button}

                            hovered={hovered}

                            setHovered={setHovered}

                        />

                    ))}

                </div>

            </div>

        </motion.div>

    );

}
function FloatingButton({

    icon,
    title,
    color,
    glow,
    action,

    hovered,
    setHovered,

}) {

    const active =
        hovered === title;

    return (

        <div className="relative flex items-center">

            {/* =========================
                TOOLTIP
            ========================= */}

            <AnimatePresence>

                {active && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            x: 15,
                            scale: .9,
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}

                        exit={{
                            opacity: 0,
                            x: 10,
                            scale: .9,
                        }}

                        transition={{
                            duration: .18,
                        }}

                        className="
                            absolute
                            right-[74px]

                            whitespace-nowrap

                            rounded-xl

                            border
                            border-white/10

                            bg-slate-900/95

                            px-4
                            py-2

                            text-sm
                            font-semibold
                            text-white

                            shadow-xl

                            backdrop-blur-xl
                        "

                    >

                        {title}

                    </motion.div>

                )}

            </AnimatePresence>

            {/* =========================
                BUTTON
            ========================= */}

            <motion.button

                whileHover={{
                    scale: 1.12,
                    rotate: 5,
                    y: -3,
                }}

                whileTap={{
                    scale: .94,
                }}

                transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 16,
                }}

                onMouseEnter={() =>
                    setHovered(title)
                }

                onMouseLeave={() =>
                    setHovered(null)
                }

                onClick={action}

                style={{

                    boxShadow: active
                        ? `0 0 28px ${glow}`
                        : "0 10px 30px rgba(0,0,0,.35)",

                }}

                className={`
                    relative

                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    overflow-hidden

                    rounded-2xl

                    bg-gradient-to-br
                    ${color}

                    text-white

                    transition-all
                `}

            >

                {/* Shine */}

                <motion.div

                    animate={{
                        x: ["-140%", "160%"],
                    }}

                    transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "linear",
                    }}

                    className="
                        absolute

                        top-0
                        left-0

                        h-full
                        w-7

                        rotate-12

                        bg-white/25

                        blur-md
                    "

                />

                <span className="relative z-10">

                    {icon}

                </span>

            </motion.button>

        </div>

    );

}

export default FloatingMenu;
