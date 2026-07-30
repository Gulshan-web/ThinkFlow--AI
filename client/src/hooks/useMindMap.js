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

        /*
        Remove extra spaces.
        */

        const keyword =
            text
                .trim()
                .toLowerCase();

        /*
        If search input is empty,
        remove previous highlight.
        */

        if (!keyword) {

            setSearchedNode(
                null
            );

            return null;

        }


        /*
        Find first matching node.
        */

        const foundNode =

            nodes.find(
                (node) => {

                    const label =

                        (
                            node.data?.label ||
                            ""
                        )
                            .toLowerCase();


                    const category =

                        (
                            node.data?.category ||
                            ""
                        )
                            .toLowerCase();


                    const description =

                        (
                            node.data?.description ||
                            ""
                        )
                            .toLowerCase();


                    return (

                        label.includes(
                            keyword
                        )

                        ||

                        category.includes(
                            keyword
                        )

                        ||

                        description.includes(
                            keyword
                        )

                    );

                }
            );

        /*
        Save matching node ID.
        */

        setSearchedNode(

            foundNode
                ? foundNode.id
                : null

        );


        /*
        Return node if needed
        by Search component.
        */

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


        const blob =

            new Blob(

                [

                    JSON.stringify(

                        data,

                        null,

                        2

                    )

                ],

                {

                    type:

                        "application/json",

                }

            );


        const url =

            URL.createObjectURL(

                blob

            );


        const link =

            document.createElement(

                "a"

            );


        link.href =

            url;


        link.download =

            "ThinkFlowAI.json";


        document.body.appendChild(

            link

        );


        link.click();


        document.body.removeChild(

            link

        );


        URL.revokeObjectURL(

            url

        );

    };


    /* =========================================
       RETURN
    ========================================= */

    return {

        /* Data */

        nodes,

        edges,

        selectedNode,

        searchedNodeId,


        /* React Flow */

        onNodesChange,

        onEdgesChange,

        onConnect,


        /* Node Actions */

        addNode,

        updateNode,

        deleteNode,

        duplicateNode,

        setSelectedNode,


        /* Search */

        searchNode,


       /* AI */

expandNodeAI,

explainNodeAI,

loadAIMindMap,

        /* Export */

        exportJSON,

        exportPNG,

        exportPDF,


        /* Canvas */

        clearCanvas,

        undo,

        redo,

        aiExplanation,
        showAIExplanation,
        closeAIExplanation,

    };

}


export default useMindMap;