import { motion } from "framer-motion";

import {
    Info,
    Tag,
    FileText,
    Palette,
    Circle,
    Paintbrush,
} from "lucide-react";

import {
    useState,
    useEffect,
} from "react";

import useMindMap from "../hooks/useMindMap";


function RightSidebar() {

    const {

        selectedNode,

        updateNode,

        deleteNode,

        duplicateNode,

    } = useMindMap();


    /* ========================================
       FORM STATES
    ======================================== */

    const [

        title,

        setTitle,

    ] = useState("");


    const [

        category,

        setCategory,

    ] = useState("");


    const [

        description,

        setDescription,

    ] = useState("");


    const [

        color,

        setColor,

    ] = useState("#06b6d4");


    const [

        nodeStyle,

        setNodeStyle,

    ] = useState("gradient");


    /* ========================================
       LOAD SELECTED NODE DATA
    ======================================== */

    useEffect(() => {

        if (!selectedNode) {

            return;

        }


        setTitle(

            selectedNode.data?.label ||

            ""

        );


        setCategory(

            selectedNode.data?.category ||

            ""

        );


        setDescription(

            selectedNode.data?.description ||

            ""

        );


        setColor(

            selectedNode.data?.color ||

            "#06b6d4"

        );


        setNodeStyle(

            selectedNode.data?.nodeStyle ||

            "gradient"

        );


    }, [

        selectedNode,

    ]);


    /* ========================================
       SAVE NODE
    ======================================== */

    function handleSave() {

        if (!selectedNode) {

            return;

        }


        updateNode(

            selectedNode.id,

            {

                label:

                    title,


                category:

                    category,


                description:

                    description,


                color:

                    color,


                /*
                IMPORTANT:

                Selected appearance
                bhi node data me save hoga.
                */

                nodeStyle:

                    nodeStyle,

            }

        );

    }


    /* ========================================
       DELETE NODE
    ======================================== */

    function handleDelete() {

        if (!selectedNode) {

            return;

        }


        deleteNode(

            selectedNode.id

        );

    }


    /* ========================================
       DUPLICATE NODE
    ======================================== */

    function handleDuplicate() {

        if (!selectedNode) {

            return;

        }


        duplicateNode(

            selectedNode.id

        );

    }


    return (

        <motion.aside

            initial={{

                x: 50,

                opacity: 0,

            }}

            animate={{

                x: 0,

                opacity: 1,

            }}

            transition={{

                duration: 0.4,

            }}

            className="

                w-80

                border-l

                border-white/10

                bg-slate-900/90

                backdrop-blur-xl

                p-6

                overflow-y-auto

            "

        >


            {/* =================================
               HEADER
            ================================= */}

            <h2

                className="

                    mb-6

                    flex

                    items-center

                    gap-2

                    text-xl

                    font-bold

                    text-white

                "

            >

                <Info

                    size={22}

                />


                Node Details


            </h2>


            {/* =================================
               EMPTY STATE
            ================================= */}

            {!selectedNode ? (

                <div

                    className="

                        rounded-2xl

                        border

                        border-dashed

                        border-slate-700

                        p-8

                        text-center

                    "

                >

                    <p

                        className="

                            text-slate-400

                        "

                    >

                        Select a node to view

                        its details.

                    </p>

                </div>

            ) : (

                <div

                    className="

                        space-y-6

                    "

                >


                    {/* =================================
                       TITLE
                    ================================= */}

                    <div

                        className="

                            rounded-2xl

                            border

                            border-white/10

                            bg-slate-800

                            p-5

                        "

                    >

                        <label

                            className="

                                mb-2

                                flex

                                items-center

                                gap-2

                                text-slate-300

                            "

                        >

                            <Circle

                                size={18}

                            />


                            Title


                        </label>


                        <input

                            value={

                                title

                            }

                            onChange={(e) =>

                                setTitle(

                                    e.target.value

                                )

                            }

                            className="

                                w-full

                                rounded-lg

                                bg-slate-700

                                p-3

                                text-white

                                outline-none

                                focus:ring-2

                                focus:ring-cyan-500/50

                            "

                        />

                    </div>


                    {/* =================================
                       CATEGORY
                    ================================= */}

                    <div

                        className="

                            rounded-2xl

                            border

                            border-white/10

                            bg-slate-800

                            p-5

                        "

                    >

                        <label

                            className="

                                mb-2

                                flex

                                items-center

                                gap-2

                                text-slate-300

                            "

                        >

                            <Tag

                                size={18}

                            />


                            Category


                        </label>


                        <input

                            value={

                                category

                            }

                            onChange={(e) =>

                                setCategory(

                                    e.target.value

                                )

                            }

                            className="

                                w-full

                                rounded-lg

                                bg-slate-700

                                p-3

                                text-white

                                outline-none

                                focus:ring-2

                                focus:ring-cyan-500/50

                            "

                        />

                    </div>


                    {/* =================================
                       DESCRIPTION
                    ================================= */}

                    <div

                        className="

                            rounded-2xl

                            border

                            border-white/10

                            bg-slate-800

                            p-5

                        "

                    >

                        <label

                            className="

                                mb-2

                                flex

                                items-center

                                gap-2

                                text-slate-300

                            "

                        >

                            <FileText

                                size={18}

                            />


                            Description


                        </label>


                        <textarea

                            rows={5}

                            value={

                                description

                            }

                            onChange={(e) =>

                                setDescription(

                                    e.target.value

                                )

                            }

                            className="

                                w-full

                                rounded-lg

                                bg-slate-700

                                p-3

                                text-white

                                outline-none

                                focus:ring-2

                                focus:ring-cyan-500/50

                            "

                        />

                    </div>


                    {/* =================================
                       COLOR PICKER
                    ================================= */}

                    <div

                        className="

                            rounded-2xl

                            border

                            border-white/10

                            bg-slate-800

                            p-5

                        "

                    >

                        <div

                            className="

                                mb-3

                                flex

                                items-center

                                gap-2

                                text-slate-300

                            "

                        >

                            <Palette

                                size={18}

                            />


                            <span>

                                Node Color

                            </span>

                        </div>


                        <div

                            className="

                                flex

                                items-center

                                gap-3

                            "

                        >

                            <input

                                type="color"

                                value={

                                    color

                                }

                                onChange={(e) =>

                                    setColor(

                                        e.target.value

                                    )

                                }

                                className="

                                    h-10

                                    w-16

                                    cursor-pointer

                                    rounded-lg

                                    border-0

                                    bg-transparent

                                "

                            />


                            <span

                                className="

                                    font-mono

                                    text-sm

                                    text-slate-300

                                "

                            >

                                {

                                    color

                                }

                            </span>

                        </div>

                    </div>


                    {/* =================================
                       NODE APPEARANCE

                       YAHI WO SECTION HAI
                       JO PEHLE MISSING THA
                    ================================= */}

                    <div

                        className="

                            rounded-2xl

                            border

                            border-white/10

                            bg-slate-800

                            p-5

                        "

                    >


                        <div

                            className="

                                mb-4

                                flex

                                items-center

                                gap-2

                                text-slate-300

                            "

                        >

                            <Paintbrush

                                size={18}

                            />


                            <span>

                                Node Appearance

                            </span>

                        </div>


                        <div

                            className="

                                grid

                                grid-cols-2

                                gap-3

                            "

                        >


                            <StyleButton

                                label="Solid"

                                value="solid"

                                currentStyle={

                                    nodeStyle

                                }

                                onClick={

                                    setNodeStyle

                                }

                            />


                            <StyleButton

                                label="Gradient"

                                value="gradient"

                                currentStyle={

                                    nodeStyle

                                }

                                onClick={

                                    setNodeStyle

                                }

                            />


                            <StyleButton

                                label="Glass"

                                value="glass"

                                currentStyle={

                                    nodeStyle

                                }

                                onClick={

                                    setNodeStyle

                                }

                            />


                            <StyleButton

                                label="Neon"

                                value="neon"

                                currentStyle={

                                    nodeStyle

                                }

                                onClick={

                                    setNodeStyle

                                }

                            />


                        </div>


                    </div>


                    {/* =================================
                       METADATA
                    ================================= */}

                    <div

                        className="

                            rounded-2xl

                            border

                            border-white/10

                            bg-slate-800

                            p-5

                        "

                    >

                        <h3

                            className="

                                mb-4

                                text-lg

                                font-semibold

                                text-white

                            "

                        >

                            Metadata

                        </h3>


                        <div

                            className="

                                space-y-3

                                text-sm

                            "

                        >

                            <InfoRow

                                label="Node ID"

                                value={

                                    selectedNode.id

                                }

                            />


                            <InfoRow

                                label="Type"

                                value={

                                    selectedNode.type ||

                                    "custom"

                                }

                            />


                            <InfoRow

                                label="X Position"

                                value={

                                    Math.round(

                                        selectedNode

                                            .position

                                            ?.x ||

                                        0

                                    )

                                }

                            />


                            <InfoRow

                                label="Y Position"

                                value={

                                    Math.round(

                                        selectedNode

                                            .position

                                            ?.y ||

                                        0

                                    )

                                }

                            />


                        </div>

                    </div>


                    {/* =================================
                       ACTION BUTTONS
                    ================================= */}

                    <div

                        className="

                            space-y-3

                            pb-8

                        "

                    >


                        <button

                            type="button"

                            onClick={

                                handleSave

                            }

                            className="

                                w-full

                                rounded-xl

                                bg-cyan-500

                                py-3

                                font-semibold

                                text-white

                                transition

                                hover:bg-cyan-600

                            "

                        >

                            Save Changes

                        </button>


                        <button

                            type="button"

                            onClick={

                                handleDuplicate

                            }

                            className="

                                w-full

                                rounded-xl

                                bg-indigo-500

                                py-3

                                font-semibold

                                text-white

                                transition

                                hover:bg-indigo-600

                            "

                        >

                            Duplicate Node

                        </button>


                        <button

                            type="button"

                            onClick={

                                handleDelete

                            }

                            className="

                                w-full

                                rounded-xl

                                bg-red-500

                                py-3

                                font-semibold

                                text-white

                                transition

                                hover:bg-red-600

                            "

                        >

                            Delete Node

                        </button>


                    </div>


                </div>

            )}


        </motion.aside>

    );

}


/* ========================================
   STYLE SELECT BUTTON
======================================== */

function StyleButton({

    label,

    value,

    currentStyle,

    onClick,

}) {

    const active =

        currentStyle ===

        value;


    return (

        <button

            type="button"

            onClick={() =>

                onClick(

                    value

                )

            }

            className={`

                rounded-xl

                border

                px-3

                py-3

                text-sm

                font-medium

                transition-all

                ${

                    active

                        ? `

                            border-cyan-400

                            bg-cyan-500/20

                            text-cyan-300

                            ring-2

                            ring-cyan-400/30

                          `

                        : `

                            border-white/10

                            bg-slate-700

                            text-slate-300

                            hover:border-cyan-400/50

                            hover:bg-slate-600

                          `

                }

            `}

        >

            {label}

        </button>

    );

}


/* ========================================
   METADATA ROW
======================================== */

function InfoRow({

    label,

    value,

}) {

    return (

        <div

            className="

                flex

                items-center

                justify-between

                gap-4

                border-b

                border-slate-700

                pb-2

            "

        >

            <span

                className="

                    text-slate-400

                "

            >

                {label}

            </span>


            <span

                className="

                    max-w-[150px]

                    break-words

                    text-right

                    font-medium

                    text-white

                "

            >

                {

                    String(

                        value

                    )

                }

            </span>


        </div>

    );

}


export default RightSidebar;