import { memo } from "react";
import { NodeToolbar } from "reactflow";
import {
    Sparkles,
    Edit3,
    Copy,
    Trash2,
    Palette,
} from "lucide-react";

function CustomNodeToolbar({
    id,
    selected,
    onAI,
    onEdit,
    onDuplicate,
    onDelete,
    onColor,
}) {
    return (
        <NodeToolbar
            isVisible={selected}
            nodeId={id}
            position="top"
            offset={12}
        >
            <div
                className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-slate-900/95
          p-2
          shadow-2xl
          backdrop-blur-xl
        "
            >
                <ToolbarButton
                    title="Expand with AI"
                    onClick={onAI}
                    color="text-cyan-400"
                >
                    <Sparkles size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Edit"
                    onClick={onEdit}
                    color="text-green-400"
                >
                    <Edit3 size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Duplicate"
                    onClick={onDuplicate}
                    color="text-indigo-400"
                >
                    <Copy size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Color"
                    onClick={onColor}
                    color="text-yellow-400"
                >
                    <Palette size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Delete"
                    onClick={onDelete}
                    color="text-red-400"
                >
                    <Trash2 size={16} />
                </ToolbarButton>
            </div>
        </NodeToolbar>
    );
}

function ToolbarButton({
    children,
    title,
    color,
    onClick,
}) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={`
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        transition-all
        duration-200
        hover:scale-110
        hover:bg-slate-800
        ${color}
      `}
        >
            {children}
        </button>
    );
}

export default memo(CustomNodeToolbar);