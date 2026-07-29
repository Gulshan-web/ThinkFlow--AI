import toast from "react-hot-toast";

import {
    Plus,
    RotateCcw,
    RotateCw,
    Download,
    LayoutGrid,
    Moon,
    Sun,
    Sparkles,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import { motion } from "framer-motion";

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

    const handleAddNode = () => {
        addNode();
    };

    const handleExport = async () => {

        const choice = window.prompt(

            "Export Type:\n1 = PNG\n2 = PDF"

        );

        if (choice === "1") {

            await exportPNG();

        }

        else if (choice === "2") {

            await exportPDF();

        }

    };

    const handleReset = () => {
        clearCanvas();
    };

    const handleAutoLayout = () => {
        console.log("Auto Layout");
    };

    const handleUndo = () => {
        undo();
    };

    const handleRedo = () => {
        redo();
    };

    const handleAI = () => {
        console.log("Generate AI");
    };

    const handleThemeToggle = () => {

    setTheme((currentTheme) =>

        currentTheme === "dark"

            ? "light"

            : "dark"

    );

};
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-white/10
      bg-slate-900/90
      p-4
      backdrop-blur-xl
    "
        >
            <div className="flex items-center gap-3">

                <ToolButton
                    icon={<Plus size={18} />}
                    title="Add Node"
                    onClick={handleAddNode}
                />

                <ToolButton
                    icon={<RotateCcw size={18} />}
                    title="Undo"
                    onClick={handleUndo}
                />

                <ToolButton
                    icon={<RotateCw size={18} />}
                    title="Redo"
                    onClick={handleRedo}
                />

                <ToolButton
                    icon={<LayoutGrid size={18} />}
                    title="Auto Layout"
                    onClick={handleAutoLayout}
                />

                <ToolButton
                    icon={<Sparkles size={18} />}
                    title="AI Generate"
                    onClick={handleAI}
                />

            </div>

            <div className="flex items-center gap-3">

                <ToolButton
                    icon={<Download size={18} />}
                    title="Export"
                    onClick={handleExport}
                />

                <ToolButton
    icon={
        theme === "dark"

            ? <Sun size={18} />

            : <Moon size={18} />
    }

    title={
        theme === "dark"

            ? "Switch to Light Theme"

            : "Switch to Dark Theme"
    }

    onClick={handleThemeToggle}
/>

                <button
                    onClick={handleReset}
                    className="
          rounded-xl
          bg-red-500
          px-4
          py-2
          text-sm
          font-semibold
          transition
          hover:bg-red-600
        "
                >
                    Reset
                </button>

            </div>

        </motion.div>
    );


    function ToolButton({
        icon,
        title,
        onClick,
    }) {
        return (
            <button
                title={title}
                onClick={onClick}
                className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-slate-800
        text-white
        transition-all
        duration-300
        hover:scale-105
        hover:border-cyan-400
        hover:bg-slate-700
      "
            >
                {icon}
            </button>
        );
    }
}
export default FlowToolbar;