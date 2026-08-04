import toast from "react-hot-toast";

import {
    Plus,
    RotateCcw,
    RotateCw,
    Download,
    Moon,
    Sun,
    Sparkles,
    Wand2,
    Trash2,
} from "lucide-react";

import {
    useState,
    useEffect,
} from "react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import useMindMap from "../hooks/useMindMap";

import {
    exportPNG,
    exportPDF,
} from "../utils/exportMindMap";

function FlowToolbar() {

    const {
        addNode,
        clearCanvas,
        undo,
        redo,
    } = useMindMap();

    const [theme, setTheme] = useState(

        () =>

            localStorage.getItem(

                "thinkflow-theme"

            ) || "dark"

    );

    const [hoveredButton, setHoveredButton] =
        useState(null);

    useEffect(() => {

        document.body.classList.toggle(

            "light-theme",

            theme === "light"

        );

        localStorage.setItem(

            "thinkflow-theme",

            theme

        );

    }, [theme]);

    /* ===========================
       ACTIONS
    =========================== */

    const handleAddNode = () => {

        addNode();

        toast.success("Node Added");

    };

    const handleUndo = () => {

        undo();

    };

    const handleRedo = () => {

        redo();

    };

    const handleReset = () => {

        if (

            window.confirm(

                "Clear entire canvas?"

            )

        ) {

            clearCanvas();

            toast.success("Canvas Cleared");

        }

    };

    const handleExport = async () => {

        const choice = window.prompt(

            "Export\n\n1 = PNG\n2 = PDF"

        );

        if (choice === "1") {

            await exportPNG();

            toast.success("PNG Exported");

        }

        else if (choice === "2") {

            await exportPDF();

            toast.success("PDF Exported");

        }

    };

    const handleThemeToggle = () => {

        setTheme((current) =>

            current === "dark"

                ? "light"

                : "dark"

        );

    };
    return (

        <motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .35 }}

            className="
sticky
top-4
z-40
flex
items-center
justify-between
rounded-2xl
border
border-white/10
bg-slate-900/80
backdrop-blur-xl
px-3
py-2.5
shadow-xl
"

        >

            {/* LEFT */}

            <div className="flex items-center gap-4">

                <div className="flex items-center gap-2">

                    <ToolButton

                        icon={<Plus size={18} />}

                        label="Add Node"

                        color="cyan"

                        hovered={hoveredButton}

                        setHovered={setHoveredButton}

                        onClick={handleAddNode}

                    />

                    <ToolButton

                        icon={<RotateCcw size={18} />}

                        label="Undo"

                        color="slate"

                        hovered={hoveredButton}

                        setHovered={setHoveredButton}

                        onClick={handleUndo}

                    />

                    <ToolButton

                        icon={<RotateCw size={18} />}

                        label="Redo"

                        color="slate"

                        hovered={hoveredButton}

                        setHovered={setHoveredButton}

                        onClick={handleRedo}

                    />

                </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

                <ToolButton

                    icon={<Download size={18} />}

                    label="Export"

                    color="emerald"

                    hovered={hoveredButton}

                    setHovered={setHoveredButton}

                    onClick={handleExport}

                />

                <ToolButton

                    icon={

                        theme === "dark"

                            ? <Sun size={18} />

                            : <Moon size={18} />

                    }

                    label="Theme"

                    color="amber"

                    hovered={hoveredButton}

                    setHovered={setHoveredButton}

                    onClick={handleThemeToggle}

                />

                <motion.button

                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: .95 }}

                    onClick={handleReset}

                    className="

flex

items-center

gap-2

rounded-2xl

bg-red-500

px-4

py-2.5

font-semibold

text-white

hover:bg-red-600

"

                >

                    <Trash2 size={17} />

                    Reset

                </motion.button>

            </div>

        </motion.div>

    );
    function ToolButton({

        icon,
        label,
        onClick,
        color = "slate",
        hovered,
        setHovered,

    }) {

        const colors = {

            cyan:
                "hover:border-cyan-400 hover:bg-cyan-500/15",

            emerald:
                "hover:border-emerald-400 hover:bg-emerald-500/15",

            violet:
                "hover:border-violet-400 hover:bg-violet-500/15",

            amber:
                "hover:border-amber-400 hover:bg-amber-500/15",

            slate:
                "hover:border-slate-400 hover:bg-slate-700/70",

        };

        return (

            <div className="relative">

                <motion.button

                    whileHover={{
                        scale: 1.08,
                        y: -2,
                    }}

                    whileTap={{
                        scale: .95,
                    }}

                    onHoverStart={() =>
                        setHovered(label)
                    }

                    onHoverEnd={() =>
                        setHovered(null)
                    }

                    onClick={onClick}

                    className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-800/70
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    ${colors[color]}
                `}

                >

                    {icon}

                </motion.button>

                <AnimatePresence>

                    {

                        hovered === label && (

                            <motion.div

                                initial={{
                                    opacity: 0,
                                    y: 8,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                exit={{
                                    opacity: 0,
                                    y: 8,
                                }}

                                transition={{
                                    duration: .15,
                                }}

                                className="
                                absolute
                                left-1/2
                                top-14
                                -translate-x-1/2
                                whitespace-nowrap
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-900
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-white
                                shadow-xl
                            "

                            >

                                {label}

                            </motion.div>

                        )

                    }

                </AnimatePresence>

            </div>

        );

    }
}
export default FlowToolbar;