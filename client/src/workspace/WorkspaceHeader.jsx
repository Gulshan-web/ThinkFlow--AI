import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import {
    BrainCircuit,
    Search,
    Sparkles,
    Settings,
    Undo2,
    Redo2,
    Home,
    ChevronRight,
    Download,
    Image,
    FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useMindMap from "../hooks/useMindMap";

function WorkspaceHeader() {
    const navigate = useNavigate();

    const {
        undo,
        redo,
        exportPNG,
        exportPDF,
        searchNode,
    } = useMindMap();

    const projectName = "ThinkFlow AI";

    const [search, setSearch] = useState("");
    const [exportOpen, setExportOpen] = useState(false);

    const exportRef = useRef(null);

    const aiStatus = "Online";

    function handleSearch(e) {

        const value = e.target.value;

        setSearch(value);

        searchNode(value);

    }

    function handleAI() {
        console.log("AI Assistant");
    }

    function handleSettings() {
        console.log("Settings");
    }
    function handleHome() {
        navigate("/");
    }

    function handleUndo() {
        undo();
    }

    function handleRedo() {
        redo();
    }
    useEffect(() => {

        function handleClickOutside(event) {

            if (
                exportRef.current &&
                !exportRef.current.contains(event.target)
            ) {
                setExportOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="
      flex
      items-center
      justify-between
      border-b
      border-white/10
      bg-slate-900/90
      px-6
      py-4
      backdrop-blur-xl
    "
        >
            {/* Left */}

            <div className="flex items-center gap-4">

                <motion.div

                    whileHover={{
                        rotate: 8,
                        scale: 1.08,
                    }}

                    className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-cyan-400
        via-blue-500
        to-indigo-600
        shadow-[0_10px_30px_rgba(34,211,238,.35)]
    "

                >
                    <BrainCircuit className="text-white" size={24} />
                </motion.div>

                <div>

                    <h1 className="text-2xl font-bold text-white">
                        {projectName}
                    </h1>

                    <p className="text-sm text-slate-400">
                        AI Mind Mapping Workspace
                    </p>

                </div>

            </div>

            {/* Center */}

            {/* Center */}

            <div className="hidden lg:flex flex-1 justify-center px-10">

                <motion.div

                    whileFocus={{ scale: 1.02 }}

                    className="
            flex
            w-full
            max-w-xl
            items-center
            rounded-2xl
            border
            border-white/10
            bg-slate-800/70
            px-5
            py-3
            backdrop-blur-xl
            transition-all
            focus-within:border-cyan-400
            focus-within:shadow-[0_0_30px_rgba(34,211,238,.15)]
        "

                >

                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        value={search}

                        onChange={handleSearch}

                        placeholder="Search nodes, concepts, AI responses..."

                        className="
                ml-4
                w-full
                bg-transparent
                text-white
                outline-none
                placeholder:text-slate-500
            "

                    />

                </motion.div>

            </div>
            {/* Right */}

<div className="flex items-center gap-3">

    {/* AI Status */}

    <motion.div

        className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-4
            py-2
        "

    >

        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />

        <span className="text-sm font-medium text-emerald-300">

            {aiStatus}

        </span>

    </motion.div>


    {/* Home */}

    <IconButton
        icon={<Home size={18} />}
        onClick={handleHome}
        title="Home"
    />


    {/* Undo */}

    <IconButton
        icon={<Undo2 size={18} />}
        onClick={handleUndo}
        title="Undo"
    />


    {/* Redo */}

    <IconButton
        icon={<Redo2 size={18} />}
        onClick={handleRedo}
        title="Redo"
    />


    {/* Export */}

    <div className="relative" ref={exportRef}>

        <motion.button

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: .95 }}

            onClick={() =>

                setExportOpen(!exportOpen)

            }

            className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-slate-800
                px-4
                py-3
                text-white
            "

        >

            <Download size={17} />

            Export

            <ChevronRight
                size={15}
                className={`transition ${
                    exportOpen
                        ? "rotate-90"
                        : ""
                }`}
            />

        </motion.button>

        <AnimatePresence>

            {

                exportOpen && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 10,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        exit={{
                            opacity: 0,
                            y: 10,
                        }}

                        className="
                            absolute
                            right-0
                            mt-3
                            w-52
                            rounded-2xl
                            border
                            border-white/10
                            bg-slate-900
                            p-2
                            shadow-2xl
                        "

                    >

                        <DropdownButton

                            icon={<Image size={17} />}

                            text="Export PNG"

                            onClick={() => {

                                exportPNG();

                                setExportOpen(false);

                            }}

                        />

                        <DropdownButton

                            icon={<FileText size={17} />}

                            text="Export PDF"

                            onClick={() => {

                                exportPDF();

                                setExportOpen(false);

                            }}

                        />

                    </motion.div>

                )

            }

        </AnimatePresence>

    </div>


    {/* AI */}

    <motion.button

        whileHover={{ scale: 1.05 }}

        whileTap={{ scale: .96 }}

        onClick={handleAI}

        className="
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-indigo-600
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
        "

    >

        <Sparkles size={18} />

    </motion.button>


    {/* Settings */}

    <IconButton

        icon={<Settings size={18} />}

        title="Settings"

        onClick={handleSettings}

    />

</div>

        </motion.header>
    );

}
function IconButton({

    icon,

    title,

    onClick,

}) {

    return (

        <motion.button

            whileHover={{
                scale: 1.08,
                y: -2,
            }}

            whileTap={{
                scale: .95,
            }}

            title={title}

            onClick={onClick}

            className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-slate-800
                text-white
                transition-all
                hover:border-cyan-400
                hover:bg-slate-700
            "

        >

            {icon}

        </motion.button>

    );

}


function DropdownButton({

    icon,

    text,

    onClick,

}) {

    return (

        <button

            onClick={onClick}

            className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-white
                transition
                hover:bg-slate-800
            "

        >

            {icon}

            {text}

        </button>

    );

}
export default WorkspaceHeader;