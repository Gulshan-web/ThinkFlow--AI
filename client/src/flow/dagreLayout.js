import dagre from "@dagrejs/dagre";
import { Position } from "reactflow";

const nodeWidth = 240;
const nodeHeight = 130;

export function getLayoutedElements(
    nodes,
    edges,
    direction = "TB"
) {
    // Har call par naya graph banao
    const dagreGraph = new dagre.graphlib.Graph();

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
        rankdir: direction,
        ranksep: 140,
        nodesep: 80,
        marginx: 50,
        marginy: 50,
    });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: nodeWidth,
            height: nodeHeight,
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const position = dagreGraph.node(node.id);

        return {
            ...node,

            targetPosition:
                direction === "LR"
                    ? Position.Left
                    : Position.Top,

            sourcePosition:
                direction === "LR"
                    ? Position.Right
                    : Position.Bottom,

            position: {
                x: position.x - nodeWidth / 2,
                y: position.y - nodeHeight / 2,
            },
        };
    });

    return {
        nodes: layoutedNodes,
        edges,
    };
}