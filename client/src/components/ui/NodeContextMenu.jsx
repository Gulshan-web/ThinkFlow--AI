import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import {
    Edit3,
    Sparkles,
    MessageCircle,
    Copy,
    BrainCircuit,
    Trash2,
} from "lucide-react";

function MenuItem({
    icon,
    label,
    danger = false,
    onClick,
    rightIcon,
}) {
    return (
        <button
            onClick={onClick}
            className={`
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                transition-all
                duration-200

                ${
                    danger
                        ? "text-red-300 hover:bg-red-500/15"
                        : "text-white hover:bg-cyan-500/10"
                }
            `}
        >
            <div className="flex items-center gap-3">

                <div className="opacity-80 transition-transform group-hover:scale-110">
                    {icon}
                </div>

                <span className="text-sm font-medium">
                    {label}
                </span>

            </div>

            {rightIcon}
        </button>
    );
}

export default function NodeContextMenu({

    x,
    y,

    open,

    onClose,

    onEdit,
    onExplain,
    onChat,
    onDuplicate,
    onExpand,
    onDelete,

}) {

    if (!document?.body) return null;

    return createPortal(

        <AnimatePresence>

            {open && (

                <motion.div

                    initial={{
                        opacity: 0,
                        scale: .94,
                        y: 8,
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}

                    exit={{
                        opacity: 0,
                        scale: .96,
                        y: 6,
                    }}

                    transition={{
                        duration: .18,
                    }}

                    style={{
                        position: "fixed",
                        left: x,
                        top: y,
                        zIndex: 999999,
                    }}

                    className="
                        w-64
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-900/95
                        p-2
                        shadow-[0_25px_60px_rgba(0,0,0,.45)]
                        backdrop-blur-2xl
                    "
                >

                    <MenuItem
                        icon={<Edit3 size={17} />}
                        label="Edit"
                        onClick={()=>{
                            onEdit();
                            onClose();
                        }}
                    />

                    <MenuItem
                        icon={<Sparkles size={17} />}
                        label="Explain with AI"
                        onClick={()=>{
                            onExplain();
                            onClose();
                        }}
                    />

                    <MenuItem
                        icon={<MessageCircle size={17} />}
                        label="AI Chat"
                        onClick={()=>{
                            onChat();
                            onClose();
                        }}
                    />

                    <MenuItem
                        icon={<Copy size={17} />}
                        label="Duplicate"
                        onClick={()=>{
                            onDuplicate();
                            onClose();
                        }}
                    />

                    <MenuItem
    icon={<BrainCircuit size={17} />}
    label="Expand AI"
    onClick={()=>{
        onExpand();
        onClose();
    }}
/>

                    <div className="my-2 h-px bg-white/10" />

                    <MenuItem
                        danger
                        icon={<Trash2 size={17} />}
                        label="Delete"
                        onClick={()=>{
                            onDelete();
                            onClose();
                        }}
                    />

                </motion.div>

            )}

        </AnimatePresence>,

        document.body

    );

}