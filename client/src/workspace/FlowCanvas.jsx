import {
    useCallback,
    useMemo,
    useEffect,
} from "react";

import ReactFlow, {
    Background,
    MiniMap,
    Panel,
    Controls,
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
                        padding: 0.18,
                        includeHiddenNodes: false,
                    }}
                    nodesDraggable
                    nodesConnectable
                    elementsSelectable

                    panOnDrag
                    zoomOnScroll
                    zoomOnPinch
                    zoomOnDoubleClick={false}

                    minZoom={0.35}
                    maxZoom={2}

                    elevateEdgesOnSelect
                    elevateNodesOnSelect

                    defaultViewport={{
                        x: 0,
                        y: 0,
                        zoom: 1,
                    }}

                    defaultEdgeOptions={{
                        type: "smoothstep",

                        animated: false,

                        style: {
                            stroke: "#38bdf8",
                            strokeWidth: 1.8,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            opacity: 0.9,
                        },

                        markerEnd: undefined,
                    }}
                    connectionLineType={ConnectionLineType.Bezier}
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
                        variant="dots"
                        gap={22}
                        size={1.2}
                        color="#1f2937"
                    />

                   <MiniMap
    pannable
    zoomable
    zoomStep={0.5}
    nodeBorderRadius={4}
    nodeStrokeWidth={0}
    maskColor="rgba(255,255,255,.08)"
    nodeColor={() => "#6b7280"}
    style={{
        width: 200,
        height: 150,
        background: "#161c28",
        border: "2px solid rgba(255,255,255,.18)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,.45)",
    }}
/>
                    <Controls
    position="bottom-right"
    showZoom={true}
    showFitView={true}
    showInteractive={true}
/>

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