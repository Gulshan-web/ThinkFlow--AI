import { motion } from "framer-motion";

import { useState } from "react";
import useMindMap from "../hooks/useMindMap";

import {
    BrainCircuit,
    Search,
    Sparkles,
    Bell,
    Settings,
    Undo2,
    Redo2,
    Home,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

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

    const aiStatus = "Ready";

    const [search, setSearch] = useState("");

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

                <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 p-3">
                    <BrainCircuit className="text-white" size={24} />
                </div>

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

            <div className="hidden w-[420px] lg:block">

                <div className="flex items-center rounded-xl border border-white/10 bg-slate-800 px-4 py-3">

                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search nodes..."
                        value={search}
                        onChange={handleSearch}
                        className="
            ml-3
            w-full
            bg-transparent
            text-white
            outline-none
            placeholder:text-slate-500
          "
                    />

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">
                <button
                    onClick={handleHome}
                    className="
        rounded-xl
        border
        border-white/10
        bg-slate-800
        p-3
        transition
        hover:bg-slate-700
    "
                >
                    <Home size={18} />
                </button>

                <button
                    onClick={handleUndo}
                    className="
        rounded-xl
        border
        border-white/10
        bg-slate-800
        p-3
        transition
        hover:bg-slate-700
    "
                >
                    <Undo2 size={18} />
                </button>

                <button
                    onClick={handleRedo}
                    className="
        rounded-xl
        border
        border-white/10
        bg-slate-800
        p-3
        transition
        hover:bg-slate-700
    "
                >
                    <Redo2 size={18} />
                </button>

                <button
                    onClick={exportPNG}
                    className="
    rounded-xl
    border
    border-white/10
    bg-green-600
    px-4
    py-2
    text-white
    hover:bg-green-700
"
                >
                    PNG
                </button>

                <button
                    onClick={exportPDF}
                    className="
    rounded-xl
    border
    border-white/10
    bg-red-600
    px-4
    py-2
    text-white
    hover:bg-red-700
"
                >
                    PDF
                </button>

                <button
                    onClick={handleAI}
                    className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-indigo-500
          px-4
          py-2
          font-semibold
          text-white
          transition
          hover:scale-105
        "
                >
                    <Sparkles size={18} />

                    {aiStatus}
                </button>

                <button
                    className="
          rounded-xl
          border
          border-white/10
          bg-slate-800
          p-3
          transition
          hover:bg-slate-700
        "
                >
                    <Bell size={18} />
                </button>

                <button
                    onClick={handleSettings}
                    className="
          rounded-xl
          border
          border-white/10
          bg-slate-800
          p-3
          transition
          hover:bg-slate-700
        "
                >
                    <Settings size={18} />
                </button>

            </div>

        </motion.header>
    );

}
export default WorkspaceHeader;