import { useEffect, useState } from "react";

import {
    Check,
    Palette,
    X,
} from "lucide-react";


const NODE_COLORS = [
    {
        name: "Cyan",
        value: "#06b6d4",
    },
    {
        name: "Blue",
        value: "#3b82f6",
    },
    {
        name: "Indigo",
        value: "#6366f1",
    },
    {
        name: "Purple",
        value: "#a855f7",
    },
    {
        name: "Pink",
        value: "#ec4899",
    },
    {
        name: "Red",
        value: "#ef4444",
    },
    {
        name: "Orange",
        value: "#f97316",
    },
    {
        name: "Yellow",
        value: "#eab308",
    },
    {
        name: "Green",
        value: "#22c55e",
    },
    {
        name: "Emerald",
        value: "#10b981",
    },
    {
        name: "Slate",
        value: "#64748b",
    },
    {
        name: "White",
        value: "#f8fafc",
    },
];


function EditNodeModal({
    open,
    node,
    onClose,
    onSave,
}) {

    const [label, setLabel] =
        useState("");

    const [
        description,
        setDescription,
    ] = useState("");

    const [
        category,
        setCategory,
    ] = useState("");

    const [color, setColor] =
        useState("#06b6d4");


    useEffect(() => {

        if (!node) return;

        setLabel(
            node.data?.label || ""
        );

        setDescription(
            node.data?.description || ""
        );

        setCategory(
            node.data?.category || ""
        );

        setColor(
            node.data?.color ||
            "#06b6d4"
        );

    }, [node]);


    if (!open || !node) {

        return null;

    }


    function handleSubmit(e) {

        e.preventDefault();

        onSave(
            node.id,
            {
                label:
                    label.trim() ||
                    "Untitled Node",

                description:
                    description.trim(),

                category:
                    category.trim(),

                color,
            }
        );

        onClose();

    }


    return (

        <div
            className="
                fixed
                inset-0
                z-[999]
                flex
                items-center
                justify-center
                overflow-y-auto
                bg-black/75
                p-4
                backdrop-blur-sm
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900
                    p-6
                    shadow-2xl
                    sm:p-8
                "
            >

                {/* ========================= */}
                {/* HEADER */}
                {/* ========================= */}

                <div
                    className="
                        mb-7
                        flex
                        items-center
                        justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <Palette
                                size={22}
                                className="
                                    text-cyan-400
                                "
                            />

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Edit Node
                            </h2>

                        </div>

                        <p
                            className="
                                text-sm
                                text-slate-400
                            "
                        >
                            Update the node details
                            and choose its color.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="
                            rounded-xl
                            p-2
                            text-slate-300
                            transition
                            hover:bg-slate-800
                            hover:text-white
                        "
                    >

                        <X size={22} />

                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* ========================= */}
                    {/* TITLE */}
                    {/* ========================= */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-300
                            "
                        >
                            Title
                        </label>


                        <input
                            type="text"
                            value={label}
                            onChange={(e) =>
                                setLabel(
                                    e.target.value
                                )
                            }
                            placeholder="
                                Enter node title
                            "
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-800
                                px-4
                                py-3
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-500
                                focus:border-cyan-500
                                focus:ring-2
                                focus:ring-cyan-500/20
                            "
                        />

                    </div>


                    {/* ========================= */}
                    {/* CATEGORY */}
                    {/* ========================= */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-300
                            "
                        >
                            Category
                        </label>


                        <input
                            type="text"
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                            placeholder="
                                Example: Technology
                            "
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-800
                                px-4
                                py-3
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-500
                                focus:border-cyan-500
                                focus:ring-2
                                focus:ring-cyan-500/20
                            "
                        />

                    </div>


                    {/* ========================= */}
                    {/* DESCRIPTION */}
                    {/* ========================= */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-300
                            "
                        >
                            Description
                        </label>


                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="
                                Add details about
                                this node...
                            "
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-800
                                px-4
                                py-3
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-500
                                focus:border-cyan-500
                                focus:ring-2
                                focus:ring-cyan-500/20
                            "
                        />

                    </div>


                    {/* ========================= */}
                    {/* COLOR PICKER */}
                    {/* ========================= */}

                    <div>

                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-300
                                "
                            >
                                Node Color
                            </label>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-slate-800
                                    px-2
                                    py-1
                                "
                            >

                                <span
                                    className="
                                        h-4
                                        w-4
                                        rounded-full
                                        border
                                        border-white/20
                                    "
                                    style={{
                                        backgroundColor:
                                            color,
                                    }}
                                />

                                <span
                                    className="
                                        font-mono
                                        text-xs
                                        uppercase
                                        text-slate-400
                                    "
                                >
                                    {color}
                                </span>

                            </div>

                        </div>


                        {/* PRESET COLORS */}

                        <div
                            className="
                                grid
                                grid-cols-6
                                gap-3
                                rounded-2xl
                                border
                                border-white/10
                                bg-slate-950/50
                                p-4
                            "
                        >

                            {NODE_COLORS.map(
                                (item) => {

                                    const isSelected =

                                        color.toLowerCase() ===

                                        item.value.toLowerCase();


                                    return (

                                        <button
                                            key={
                                                item.value
                                            }
                                            type="button"
                                            title={
                                                item.name
                                            }
                                            aria-label={
                                                `Select ${item.name} color`
                                            }
                                            onClick={() =>
                                                setColor(
                                                    item.value
                                                )
                                            }
                                            className={`
                                                relative
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-full
                                                border-2
                                                transition
                                                hover:scale-110
                                                ${
                                                    isSelected
                                                        ? `
                                                            scale-110
                                                            border-white
                                                            shadow-lg
                                                        `
                                                        : `
                                                            border-transparent
                                                            hover:border-white/40
                                                        `
                                                }
                                            `}
                                            style={{
                                                backgroundColor:
                                                    item.value,
                                            }}
                                        >

                                            {isSelected && (

                                                <Check
                                                    size={18}
                                                    className={
                                                        item.value ===
                                                        "#f8fafc"
                                                            ? `
                                                                text-slate-900
                                                            `
                                                            : `
                                                                text-white
                                                            `
                                                    }
                                                    strokeWidth={
                                                        3
                                                    }
                                                />

                                            )}

                                        </button>

                                    );

                                }

                            )}

                        </div>


                        {/* CUSTOM COLOR */}

                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-800/70
                                p-3
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-white
                                    "
                                >
                                    Custom Color
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Choose any color
                                    you want.
                                </p>

                            </div>


                            <input
                                type="color"
                                value={color}
                                onChange={(e) =>
                                    setColor(
                                        e.target.value
                                    )
                                }
                                aria-label="
                                    Choose custom
                                    node color
                                "
                                className="
                                    h-11
                                    w-16
                                    cursor-pointer
                                    rounded-lg
                                    border
                                    border-white/20
                                    bg-transparent
                                    p-1
                                "
                            />

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* BUTTONS */}
                    {/* ========================= */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            border-t
                            border-white/10
                            pt-5
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-xl
                                border
                                border-white/10
                                px-5
                                py-3
                                font-medium
                                text-white
                                transition
                                hover:bg-slate-800
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="
                                rounded-xl
                                bg-gradient-to-r
                                from-cyan-500
                                via-indigo-500
                                to-purple-500
                                px-6
                                py-3
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-cyan-500/10
                                transition
                                hover:scale-[1.03]
                                hover:shadow-cyan-500/20
                                active:scale-[0.98]
                            "
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default EditNodeModal;