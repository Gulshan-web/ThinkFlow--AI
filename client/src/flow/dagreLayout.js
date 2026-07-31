import dagre from "@dagrejs/dagre";
import { Position } from "reactflow";

const nodeWidth = 300;
const nodeHeight = 200;

export function getLayoutedElements(
    nodes,
    edges,
    direction = "TB"
) {

    const dagreGraph = new dagre.graphlib.Graph();

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
    rankdir: "TB",

    ranksep: 200,

    nodesep: 130,

    edgesep: 80,

    marginx: 100,

    marginy: 100,
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