import {
    Plus,
    Download,
    RotateCcw,
    Sparkles,
} from "lucide-react";

import useMindMap from "../../hooks/useMindMap";

function Toolbar() {
    const {
        addNode,
        clearCanvas,
        exportJSON,
    } = useMindMap();

    return (
        <div
            className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-slate-900
        p-4
      "
        >
            <div className="flex gap-3">

                <button
                    onClick={() => addNode()}
                    className="
            rounded-xl
            bg-cyan-500
            px-4
            py-2
            text-white
            transition
            hover:bg-cyan-600
          "
                >
                    <Plus size={18} />
                </button>

                <button
                    className="
            rounded-xl
            bg-purple-500
            px-4
            py-2
            text-white
          "
                >
                    <Sparkles size={18} />
                </button>

            </div>

            <div className="flex gap-3">

                <button
                    onClick={exportJSON}
                    className="
            rounded-xl
            bg-green-500
            px-4
            py-2
            text-white
          "
                >
                    <Download size={18} />
                </button>

                <button
                    onClick={clearCanvas}
                    className="
            rounded-xl
            bg-red-500
            px-4
            py-2
            text-white
          "
                >
                    <RotateCcw size={18} />
                </button>

            </div>
        </div>
    );
}

export default Toolbar;