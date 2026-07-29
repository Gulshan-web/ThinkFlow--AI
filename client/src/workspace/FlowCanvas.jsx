import {
    useCallback,
    useMemo,
    useEffect,
} from "react";

import ReactFlow, {
    Background,
    MiniMap,
    Panel,
    ConnectionLineType,
} from "reactflow";

import "reactflow/dist/style.css";

import { motion } from "framer-motion";

import FlowControls from "./FlowControls";
import FlowToolbar from "./FlowToolbar";

import nodeTypes from "../flow/nodeTypes";
import { getLayoutedElements } from "../flow/dagreLayout";

import useMindMap from "../hooks/useMindMap";
import EditNodeModal from "../components/ui/EditNodeModal";

function FlowCanvas() {

    
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        updateNode,
        selectedNode,
        setSelectedNode,
    } = useMindMap();

    const isModalOpen = Boolean(selectedNode);

    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {

        const layout = getLayoutedElements(
            [...nodes],
            [...edges]
        );

        return layout;

    }, [nodes, edges]);


    useEffect(() => {

        window.layoutedNodes = layoutedNodes;
        window.layoutedEdges = layoutedEdges;

    }, [layoutedNodes, layoutedEdges]);

    const handleConnect = useCallback(
        (params) => {
            onConnect(params);
        },
        [onConnect]
    );

    const handleSaveNode = useCallback(
        (id, data) => {
            updateNode(id, data);
        },
        [updateNode]
    );

    const handleCloseModal = () => {
        setSelectedNode(null);
    };

    return (
        <>
            <motion.div
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <ReactFlow

                    nodes={layoutedNodes}
                    edges={layoutedEdges}

                    nodeTypes={nodeTypes}

                    onInit={(instance) => {

    console.log("ReactFlow Ready");

    window.reactFlowInstance = instance;

    console.log(window.reactFlowInstance);

}}

                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={handleConnect}

                    fitView

                    fitViewOptions={{
                        padding: 0.3,
                    }}

                    defaultViewport={{
                        x: 0,
                        y: 0,
                        zoom: 1,
                    }}

                    defaultEdgeOptions={{
                        type: "smoothstep",

                        animated: true,

                        style: {
                            stroke: "#22d3ee",
                            strokeWidth: 3,
                            filter:
                                "drop-shadow(0 0 5px rgba(34, 211, 238, 0.8))",
                        },

                        markerEnd: {
                            type: "arrowclosed",
                            color: "#22d3ee",
                            width: 18,
                            height: 18,
                        },
                    }}

                    connectionLineType={
                        ConnectionLineType.SmoothStep
                    }

                    snapToGrid
                    snapGrid={[20, 20]}

                    deleteKeyCode="Delete"
                    selectionKeyCode="Shift"
                    multiSelectionKeyCode="Control"

                    proOptions={{
                        hideAttribution: true,
                    }}

                >
                    <Background
                        gap={24}
                        size={1.5}
                        color="#334155"
                    />

                    <MiniMap
                        pannable
                        zoomable
                        nodeStrokeWidth={3}
                        nodeBorderRadius={8}
                    />

                    <FlowControls />

                    <Panel position="top-left">
                        <FlowToolbar />
                    </Panel>

                    <Panel position="top-right">
                        <div className="rounded-xl bg-slate-900/80 px-4 py-2 text-sm text-white backdrop-blur">
                            Nodes: {nodes.length}
                        </div>
                    </Panel>

                </ReactFlow>
            </motion.div>

            <EditNodeModal
                open={isModalOpen}
                node={selectedNode}
                onClose={handleCloseModal}
                onSave={handleSaveNode}
            />
        </>
    );
}

export default FlowCanvas;