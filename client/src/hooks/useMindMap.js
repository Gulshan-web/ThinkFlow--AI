import {
    exportPNG,
    exportPDF,
} from "../utils/exportMindMap";

import useStore from "../store/useStore";

function useMindMap() {

    const {

        nodes,
        edges,

        selectedNode,

        searchedNodeId,

        onNodesChange,
        onEdgesChange,
        onConnect,

        addNode,
        updateNode,
        deleteNode,
        duplicateNode,

        setSelectedNode,

        clearCanvas,

        undo,
        redo,

        expandNodeAI,
        explainNodeAI,

        loadAIMindMap,

        setSearchedNode,

        aiExplanation,
        showAIExplanation,
        closeAIExplanation,

    } = useStore();

    /* =========================================
       SEARCH NODE
    ========================================= */

    const searchNode = (text) => {

        const keyword =
            text.trim().toLowerCase();

        if (!keyword) {

            setSearchedNode(null);

            return null;

        }

        const foundNode = nodes.find((node) => {

            const label =
                (node.data?.label || "").toLowerCase();

            const category =
                (node.data?.category || "").toLowerCase();

            const description =
                (node.data?.description || "").toLowerCase();

            return (
                label.includes(keyword) ||
                category.includes(keyword) ||
                description.includes(keyword)
            );

        });

        setSearchedNode(

            foundNode
                ? foundNode.id
                : null

        );

        return foundNode || null;

    };

    /* =========================================
       EXPORT JSON
    ========================================= */

    const exportJSON = () => {

        const data = {

            nodes,
            edges,

        };

        const blob = new Blob(

            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],

            {
                type: "application/json",
            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "ThinkFlowAI.json";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    };

    /* =========================================
       RETURN
    ========================================= */

    return {

        /* DATA */

        nodes,
        edges,

        selectedNode,

        searchedNodeId,

        /* REACT FLOW */

        onNodesChange,
        onEdgesChange,
        onConnect,

        /* NODE */

        addNode,
        updateNode,
        deleteNode,
        duplicateNode,

        setSelectedNode,

        /* SEARCH */

        searchNode,

        /* AI */

        expandNodeAI,
        explainNodeAI,

        loadAIMindMap,

        aiExplanation,
        showAIExplanation,
        closeAIExplanation,

        /* EXPORT */

        exportJSON,
        exportPNG,
        exportPDF,

        /* CANVAS */

        clearCanvas,

        undo,
        redo,

    };

}

export default useMindMap;