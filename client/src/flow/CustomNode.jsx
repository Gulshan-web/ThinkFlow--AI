import {
    memo,
    useState,
    useEffect,
    useCallback,
} from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import NodeContextMenu from "../components/ui/NodeContextMenu";

import {
    Edit3,
    Trash2,
    Copy,
    Sparkles,
    MessageCircle,
    BookOpen,
    Circle,
    Palette,
    BrainCircuit,
} from "lucide-react";
import useMindMap from "../hooks/useMindMap";

function CustomNode({
    id,
    data,
    selected,
}) {

    const {
        deleteNode,
        duplicateNode,
        setSelectedNode,
        expandNodeAI,
        explainNodeAI,
        openAIChat,
        searchedNodeId,
    } = useMindMap();
    const [menu, setMenu] = useState({
    open: false,
    x: 0,
    y: 0,
});

const handleContextMenu = useCallback((e) => {

    e.preventDefault();
    e.stopPropagation();

    setMenu({

        open: true,

        x: e.clientX,

        y: e.clientY,

    });

}, []);

const closeMenu = useCallback(() => {

    setMenu({

        open:false,

        x:0,

        y:0,

    });

}, []);
useEffect(() => {

    function handleClick() {

        closeMenu();

    }

    function handleEsc(e){

        if(e.key==="Escape"){

            closeMenu();

        }

    }

    window.addEventListener("click",handleClick);

    window.addEventListener("keydown",handleEsc);

    return ()=>{

        window.removeEventListener("click",handleClick);

        window.removeEventListener("keydown",handleEsc);

    };

},[closeMenu]);

    const nodeColor =
        data?.color || "#3b82f6";

    const isSearched =
        searchedNodeId === id;

    const nodeStyle = {

        background: `
            linear-gradient(
                180deg,
                ${nodeColor},
                ${nodeColor}E6
            )
        `,

        border: `2px solid ${isSearched
            ? "#facc15"
            : selected
                ? "#22d3ee"
                : `${nodeColor}88`
            }`,

        boxShadow: isSearched
            ? `
        0 0 0 4px rgba(250,204,21,.45),
        0 0 30px rgba(250,204,21,.35),
        0 20px 60px rgba(0,0,0,.40)
      `
            : selected
                ? `
        0 0 0 3px rgba(34,211,238,.45),
        0 0 40px rgba(34,211,238,.35),
        0 20px 60px rgba(0,0,0,.40)
      `
                : `
        0 12px 35px rgba(0,0,0,.25)
      `,
    };

    function handleEdit() {

        setSelectedNode({
            id,
            data,
        });

    }

    function handleDelete() {
        deleteNode(id);
    }

    function handleDuplicate() {
        duplicateNode(id);
    }

    function handleExplain() {
        explainNodeAI(data.label);
    }

    function handleChat() {
        openAIChat(data.label);
    }

    function handleExpand() {
        expandNodeAI(id);
    }
    return (
        <motion.div
            onContextMenu={handleContextMenu}
            initial={{
                opacity: 0,
                y: 15,
                scale: .95,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: selected ? 1.04 : 1,
                rotate: 0,
            }}

            whileHover={{
                scale: selected ? 1.05 : 1.03,
                y: -6,
            }}

            transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
                duration: 0.25,
            }}
            className={`
        group
        relative
        min-w-[350px]
        max-w-[350px]
        min-h-[260px]
        overflow-hidden
        rounded-2xl
        border
        backdrop-blur-2xl
        hover:border-cyan-400/40
      `}
            style={nodeStyle}
        >

            <Handle
                type="target"
                position={Position.Top}
                className="
        !h-4
        !w-4
        !border-3
        !border-white
        !bg-white
        transition-all
    "
            />

            <div className="relative z-10 px-6 py-6">

                {/* ==========================
        HEADER
    ========================== */}

                <div className="flex items-start gap-6">

                    <div

                        style={{
                            background: "rgba(255,255,255,.15)",
                            border: "1px solid rgba(255,255,255,.18)",
                        }}

                        className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                backdrop-blur-xl
            "

                    >

                        <Circle
                            size={15}
                            fill="#ffffff"
                            color="#ffffff"
                        />

                    </div>

                    <div className="flex-1">

                        <h3
                            className="
                    text-[28px]
                    font-bold
                    leading-7
                    tracking-tight
                    text-white
                    break-words
                "
                        >
                            {data?.label}
                        </h3>

                        <div className="mt-3 flex items-center gap-2">

                            <span
                                className="
                        rounded-full
                        bg-white/15
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-white
                        backdrop-blur
                    "
                            >
                                {data?.category || "General"}
                            </span>

                            {selected && (

                                <motion.span

                                    initial={{
                                        opacity: 0,
                                        scale: .8,
                                    }}

                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}

                                    transition={{
                                        duration: .25,
                                    }}

                                    className="
rounded-full
bg-cyan-400/20
border
border-cyan-300/30
px-3
py-1
text-xs
font-semibold
text-cyan-200
"

                                >
                                    Selected
                                </motion.span>

                            )}

                        </div>

                    </div>

                </div>

                {/* ==========================
        DESCRIPTION
    ========================== */}

                <div
                   className="
mt-4
rounded-2xl
bg-black/10
p-4
min-h-[70px]
backdrop-blur-lg
"
                >

                    <p
className="
text-[18px]
leading-6
font-medium
text-white/95
break-words
whitespace-pre-wrap
overflow-hidden
"
style={{
    wordBreak: "break-word",
}}
>
                    
                        {data?.description ||
                            "No description available"}
                    </p>

                </div>
                {/* Bottom Accent */}
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                className="
        !h-3
        !w-3
        !border-4
        !border-white
        !bg-white
        transition-all
    "
            />
            <NodeContextMenu

    open={menu.open}

    x={menu.x}

    y={menu.y}

    onClose={closeMenu}

    onEdit={handleEdit}

    onExplain={handleExplain}

    onChat={handleChat}

    onDuplicate={handleDuplicate}

    onDelete={handleDelete}

    onExpand={handleExpand}

/>
        </motion.div>

    );
}
export default memo(CustomNode);