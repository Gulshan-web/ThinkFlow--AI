import { memo } from "react";

import {
    Handle,
    Position,
} from "reactflow";

import {
    motion,
} from "framer-motion";

import {
    Edit3,
    Trash2,
    Copy,
    Sparkles,
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

        searchedNodeId,

    } = useMindMap();


    /* =====================================
       NODE ACTIONS
    ===================================== */

    function handleEdit() {

        setSelectedNode({

            id,

            data,

        });

    }


    function handleDelete() {

        deleteNode(
            id
        );

    }


    function handleDuplicate() {

        duplicateNode(
            id
        );

    }


    function handleAIExpand() {

        expandNodeAI(
            id
        );

    }


    /* =====================================
       NODE COLOR
    ===================================== */

    const nodeColor =

        data?.color ||

        "#06b6d4";


    /* =====================================
       SEARCH STATE
    ===================================== */

    const isSearchedNode =

        searchedNodeId === id;


    /* =====================================
       NODE STYLE
    ===================================== */

    const nodeStyle = {

        background:

            nodeColor,


        /*
        Search match hone par
        yellow border.
        */

        borderColor:

            isSearchedNode

                ? "#facc15"

                : selected

                    ? "#22d3ee"

                    : "#000000",


        /*
        Search match hone par
        strong yellow glow.
        */

        boxShadow:

            isSearchedNode

                ? `
                    0 0 0 5px
                    rgba(
                        250,
                        204,
                        21,
                        0.50
                    ),

                    0 0 35px
                    rgba(
                        250,
                        204,
                        21,
                        0.90
                    ),

                    0 12px 35px
                    rgba(
                        0,
                        0,
                        0,
                        0.50
                    )
                  `

                : selected

                    ? `
                        0 0 0 3px
                        rgba(
                            34,
                            211,
                            238,
                            0.35
                        ),

                        0 10px 25px
                        rgba(
                            0,
                            0,
                            0,
                            0.35
                        )
                      `

                    : `
                        0 10px 25px
                        rgba(
                            0,
                            0,
                            0,
                            0.35
                        )
                      `,

    };


    return (

        <motion.div

            whileHover={{

                scale:

                    1.04,

            }}

            transition={{

                duration:

                    0.2,

            }}

            className={`

                relative

                min-w-[230px]

                rounded-2xl

                border-2

                p-4

                shadow-xl

                transition-all

                ${

                    isSearchedNode

                        ? `
                            border-yellow-400

                            ring-4

                            ring-yellow-400/70

                            animate-pulse
                          `

                        : selected

                            ? `
                                border-cyan-400

                                ring-2

                                ring-cyan-400/40
                              `

                            : `
                                border-black
                              `

                }

            `}

            style={

                nodeStyle

            }

        >


            {/* =============================
                TARGET HANDLE
            ============================= */}

            <Handle

                type="target"

                position={

                    Position.Top

                }

            />


            {/* =============================
                TITLE
            ============================= */}

            <h3
                className="
                    mb-2
                    text-lg
                    font-bold
                    text-white
                "
            >

                {

                    data?.label

                }

            </h3>


            {/* =============================
                DESCRIPTION
            ============================= */}

            <p
                className="
                    mb-4
                    text-sm
                    text-slate-300
                "
            >

                {

                    data?.description ||

                    "No description available"

                }

            </p>


            {/* =============================
                CATEGORY
            ============================= */}

            <span

                className="

                    rounded-full

                    bg-cyan-500/20

                    px-3

                    py-1

                    text-xs

                    text-cyan-300

                "

            >

                {

                    data?.category ||

                    "General"

                }

            </span>


            {/* =============================
                NODE TOOLBAR
            ============================= */}

            <div
                className="

                    mt-5

                    flex

                    justify-between

                "
            >


                {/* EDIT */}

                <button

                    onClick={

                        handleEdit

                    }

                    className="

                        rounded-lg

                        bg-slate-700

                        p-2

                        transition

                        hover:bg-cyan-500

                    "

                    title="Edit Node"

                >

                    <Edit3
                        size={16}
                    />

                </button>


                {/* DUPLICATE */}

                <button

                    onClick={

                        handleDuplicate

                    }

                    className="

                        rounded-lg

                        bg-slate-700

                        p-2

                        transition

                        hover:bg-blue-500

                    "

                    title="Duplicate Node"

                >

                    <Copy
                        size={16}
                    />

                </button>


                {/* AI EXPAND */}

                <button

                    onClick={

                        handleAIExpand

                    }

                    className="

                        rounded-lg

                        bg-slate-700

                        p-2

                        transition

                        hover:bg-purple-500

                    "

                    title="Expand with AI"

                >

                    <Sparkles
                        size={16}
                    />

                </button>


                {/* DELETE */}

                <button

                    onClick={

                        handleDelete

                    }

                    className="

                        rounded-lg

                        bg-slate-700

                        p-2

                        transition

                        hover:bg-red-500

                    "

                    title="Delete Node"

                >

                    <Trash2
                        size={16}
                    />

                </button>


            </div>


            {/* =============================
                SOURCE HANDLE
            ============================= */}

            <Handle

                type="source"

                position={

                    Position.Bottom

                }

            />


        </motion.div>

    );

}


export default memo(
    CustomNode
);