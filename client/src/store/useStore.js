import { create } from "zustand";
import toast from "react-hot-toast";
import { expandNode } from "../services/api";

import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from "reactflow";

import {
    saveMindMap,
    loadMindMap,
} from "../utils/localStorage";

import {
    generateId,
    randomPosition,
} from "../utils/helpers";

import {
    DEFAULT_NODE_COLOR,
} from "../utils/constants";


/* ================================================= */
/* LOAD SAVED MIND MAP                               */
/* ================================================= */

/*
Refresh ke time localStorage se
purana mind map load hoga.
*/

const savedData =
    loadMindMap();


/*
Agar saved nodes available hain,
to wahi load karo.

Agar koi saved mind map nahi hai,
to empty canvas rakho.

Default node nahi banega.
*/

const defaultNodes =
    Array.isArray(
        savedData?.nodes
    )
        ? savedData.nodes
        : [];


/*
Saved edges load karo.

Agar saved edges nahi hain,
to empty array use hogi.
*/

const defaultEdges =
    Array.isArray(
        savedData?.edges
    )
        ? savedData.edges
        : [];


/* ================================================= */
/* SAVE STATE                                        */
/* ================================================= */

const saveState = (
    nodes,
    edges
) => {

    saveMindMap(
        nodes,
        edges
    );

};


/* ================================================= */
/* HISTORY                                           */
/* ================================================= */

const pushHistory =
    (state) => ({

        history: [

            ...state.history,

            {

                nodes:
                    state.nodes,

                edges:
                    state.edges,

            },

        ],

        future: [],

    });


/* ================================================= */
/* ZUSTAND STORE                                     */
/* ================================================= */

const useStore = create(

    (set, get) => ({

        setAIExplanation: (data) =>
            set({
                aiExplanation: data,
                showAIExplanation: true,
            }),

        closeAIExplanation: () =>
            set({
                showAIExplanation: false,
                aiExplanation: null,
            }),

        aiExplanation: null,
        showAIExplanation: false,

        /* ----------------------------------------- */
        /* INITIAL STATE                             */
        /* ----------------------------------------- */

        nodes:
            defaultNodes,

        edges:
            defaultEdges,


        selectedNode:
            null,


        searchedNodeId:
            null,


        history:
            [],


        future:
            [],


        /* ----------------------------------------- */
        /* SELECTED NODE                             */
        /* ----------------------------------------- */

        setSelectedNode(
            node
        ) {

            set({

                selectedNode:
                    node,

            });

        },


        /* ----------------------------------------- */
        /* SEARCHED NODE                             */
        /* ----------------------------------------- */

        setSearchedNode(
            id
        ) {

            set({

                searchedNodeId:
                    id,

            });

        },


        /* ----------------------------------------- */
        /* SET NODES                                 */
        /* ----------------------------------------- */

        setNodes(
            nodes
        ) {

            set({

                nodes,

            });


            saveState(

                nodes,

                get().edges

            );

        },


        /* ----------------------------------------- */
        /* SET EDGES                                 */
        /* ----------------------------------------- */

        setEdges(
            edges
        ) {

            set({

                edges,

            });


            saveState(

                get().nodes,

                edges

            );

        },


        /* ----------------------------------------- */
        /* REACT FLOW NODE CHANGES                   */
        /* ----------------------------------------- */

        onNodesChange(
            changes
        ) {

            const nodes =

                applyNodeChanges(

                    changes,

                    get().nodes

                );


            set({

                nodes,

            });


            saveState(

                nodes,

                get().edges

            );

        },


        /* ----------------------------------------- */
        /* REACT FLOW EDGE CHANGES                   */
        /* ----------------------------------------- */

        onEdgesChange(
            changes
        ) {

            const edges =

                applyEdgeChanges(

                    changes,

                    get().edges

                );


            set({

                edges,

            });


            saveState(

                get().nodes,

                edges

            );

        },


        /* ----------------------------------------- */
        /* CONNECT NODES                             */
        /* ----------------------------------------- */

        onConnect(
            connection
        ) {

            const edges =

                addEdge(

                    {

                        ...connection,

                        animated:
                            true,

                    },

                    get().edges

                );


            set({

                edges,

            });


            saveState(

                get().nodes,

                edges

            );

        },


        /* ----------------------------------------- */
        /* ADD NODE                                  */
        /* ----------------------------------------- */

        addNode(
            parentId = null
        ) {

            const id =

                generateId();


            const newNode = {

                id,

                type:
                    "custom",


                position:

                    randomPosition(),


                data: {

                    id,

                    label:
                        "New Idea",


                    category:
                        "Idea",


                    description:
                        "",


                    color:
                        DEFAULT_NODE_COLOR,

                },

            };


            let newEdges = [

                ...get().edges,

            ];


            /*
            Parent ID diya hai to
            parent aur new node connect honge.
            */

            if (
                parentId
            ) {

                newEdges.push({

                    id:
                        `${parentId}-${id}`,


                    source:
                        parentId,


                    target:
                        id,


                    animated:
                        true,

                });

            }


            const newNodes = [

                ...get().nodes,

                newNode,

            ];


            set(

                (state) => ({

                    ...pushHistory(
                        state
                    ),


                    nodes:
                        newNodes,


                    edges:
                        newEdges,

                })

            );


            saveState(

                newNodes,

                newEdges

            );
            toast.success("Node Added");

        },


        /* ----------------------------------------- */
        /* UPDATE NODE                               */
        /* ----------------------------------------- */

        updateNode(
            id,
            updatedData
        ) {

            const newNodes =

                get().nodes.map(

                    (node) =>

                        node.id === id

                            ? {

                                ...node,


                                data: {

                                    ...node.data,

                                    ...updatedData,

                                },

                            }

                            : node

                );


            set(

                (state) => ({

                    ...pushHistory(
                        state
                    ),


                    nodes:
                        newNodes,

                })

            );


            saveState(

                newNodes,

                get().edges

            );
            toast.success("Node Updated");

        },


        /* ----------------------------------------- */
        /* DELETE NODE                               */
        /* ----------------------------------------- */

        deleteNode(
            id
        ) {

            const newNodes =

                get().nodes.filter(

                    (node) =>

                        node.id !== id

                );


            /*
            Deleted node se connected
            edges bhi remove hongi.
            */

            const newEdges =

                get().edges.filter(

                    (edge) =>

                        edge.source !== id &&

                        edge.target !== id

                );


            set(

                (state) => ({

                    ...pushHistory(
                        state
                    ),


                    nodes:
                        newNodes,


                    edges:
                        newEdges,


                    selectedNode:
                        null,

                })

            );


            saveState(

                newNodes,

                newEdges

            );
            toast.success("Node Deleted");

        },


        /* ----------------------------------------- */
        /* DUPLICATE NODE                            */
        /* ----------------------------------------- */

        duplicateNode(
            id
        ) {

            const node =

                get().nodes.find(

                    (n) =>

                        n.id === id

                );


            if (
                !node
            ) {

                return;

            }


            const newId =

                generateId();


            const duplicate = {

                ...node,


                id:
                    newId,


                position: {

                    x:

                        node.position.x +

                        80,


                    y:

                        node.position.y +

                        80,

                },


                data: {

                    ...node.data,


                    id:
                        newId,


                    label:

                        `${node.data.label} Copy`,

                },

            };


            const newNodes = [

                ...get().nodes,

                duplicate,

            ];


            set(

                (state) => ({

                    ...pushHistory(
                        state
                    ),


                    nodes:
                        newNodes,

                })

            );


            saveState(

                newNodes,

                get().edges

            );
            toast.success("Node Duplicated");

        },


        /* ----------------------------------------- */
        /* UNDO                                      */
        /* ----------------------------------------- */

        undo() {

            const history =

                get().history;


            if (
                history.length === 0
            ) {

                return;

            }


            const previous =

                history[
                history.length - 1
                ];


            const current = {

                nodes:
                    get().nodes,


                edges:
                    get().edges,

            };


            set({

                nodes:
                    previous.nodes,


                edges:
                    previous.edges,


                history:

                    history.slice(
                        0,
                        -1
                    ),


                future: [

                    ...get().future,

                    current,

                ],


                selectedNode:
                    null,

            });


            saveState(

                previous.nodes,

                previous.edges

            );

        },


        /* ----------------------------------------- */
        /* REDO                                      */
        /* ----------------------------------------- */

        redo() {

            const future =

                get().future;


            if (
                future.length === 0
            ) {

                return;

            }


            const next =

                future[
                future.length - 1
                ];


            const current = {

                nodes:
                    get().nodes,


                edges:
                    get().edges,

            };


            set({

                nodes:
                    next.nodes,


                edges:
                    next.edges,


                history: [

                    ...get().history,

                    current,

                ],


                future:

                    future.slice(
                        0,
                        -1
                    ),


                selectedNode:
                    null,

            });


            saveState(

                next.nodes,

                next.edges

            );

        },


        /* ----------------------------------------- */
        /* RESET CANVAS                              */
        /* ----------------------------------------- */

        clearCanvas() {

            /*
            Reset button:

            Nodes aur edges empty honge.

            Empty state bhi localStorage me
            save hogi.

            Iske baad Workspace.jsx me
            Generate Mind Map block dikhega.
            */

            set(

                (state) => ({

                    ...pushHistory(
                        state
                    ),


                    nodes:
                        [],


                    edges:
                        [],


                    selectedNode:
                        null,


                    searchedNodeId:
                        null,

                })

            );


            saveState(

                [],

                []

            );
            toast.success("Canvas Reset");

        },


        /* ----------------------------------------- */
        /* LOAD AI MIND MAP                          */
        /* ----------------------------------------- */

        loadAIMindMap(
            nodes,
            edges
        ) {

            console.log(

                "STORE RECEIVED:",

                nodes,

                edges

            );


            const aiNodes =

                nodes.map(

                    (node) => ({

                        ...node,


                        type:
                            "custom",


                        data: {

                            ...node.data,


                            id:
                                node.id,


                            label:

                                node.data?.label ||

                                "Untitled",


                            category:

                                node.data?.category ||

                                "AI",


                            description:

                                node.data?.description ||

                                "",


                            color:

                                node.data?.color ||

                                DEFAULT_NODE_COLOR,

                        },

                    })

                );


            set(

                (state) => ({

                    ...pushHistory(
                        state
                    ),


                    nodes:
                        aiNodes,


                    edges:
                        edges || [],


                    selectedNode:
                        null,


                    searchedNodeId:
                        null,

                })

            );


            /*
            AI generated mind map
            localStorage me save hoga.
            */

            saveState(

                aiNodes,

                edges || []

            );

        },


        /* ----------------------------------------- */
        /* EXPAND NODE WITH AI                       */
        /* ----------------------------------------- */
        explainNodeAI: async (topic) => {

            try {

                const { explainMindMapNode } =
                    await import("../services/aiService");

                const result =
                    await explainMindMapNode(topic);

                set({

                    aiExplanation: result,

                    showAIExplanation: true,

                });

            }

            catch (err) {

                console.error(err);

            }

        },
        async expandNodeAI(
            id
        ) {

            const parentNode =

                get().nodes.find(

                    (node) =>

                        node.id === id

                );


            if (
                !parentNode
            ) {

                return;

            }


            try {

                console.log(

                    "Expanding:",

                    parentNode.data.label

                );


                const result =

                    await expandNode(

                        parentNode.data.label

                    );


                if (
                    !result.children
                ) {

                    return;

                }


                const newNodes = [

                    ...get().nodes,

                ];


                const newEdges = [

                    ...get().edges,

                ];


                result.children.forEach(

                    (
                        child,
                        index
                    ) => {

                        const childId =

                            generateId();


                        newNodes.push({

                            id:
                                childId,


                            type:
                                "custom",


                            position: {

                                x:

                                    parentNode
                                        .position.x +

                                    (

                                        index -

                                        (
                                            result
                                                .children
                                                .length -

                                            1
                                        ) / 2

                                    ) *

                                    280,


                                y:

                                    parentNode
                                        .position.y +

                                    220,

                            },


                            data: {

                                id:
                                    childId,


                                label:

                                    child.title ||

                                    "New AI Idea",


                                category:
                                    "AI",


                                description:

                                    child.description ||

                                    "",


                                color:

                                    DEFAULT_NODE_COLOR,

                            },

                        });


                        newEdges.push({

                            id:

                                `${id}-${childId}`,


                            source:
                                id,


                            target:
                                childId,


                            animated:
                                true,

                        });

                    }

                );


                set(

                    (state) => ({

                        ...pushHistory(
                            state
                        ),


                        nodes:
                            newNodes,


                        edges:
                            newEdges,

                    })

                );


                /*
                Expanded nodes bhi
                localStorage me save honge.
                */

                saveState(

                    newNodes,

                    newEdges

                );

                toast.success("AI Node Expanded");

            }

            catch (
            err
            ) {

                console.error(
                    err
                );


                toast.error("AI Expansion Failed");

            }

        },

    })

);


export default useStore;