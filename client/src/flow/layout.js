/**
 * Auto Layout Utility
 *
 * This arranges nodes in a simple tree layout.
 * Later we can upgrade this to ELK.js or Dagre.
 */

const HORIZONTAL_GAP = 260;
const VERTICAL_GAP = 170;

export function autoLayout(nodes, edges) {
    if (!nodes.length) {
        return nodes;
    }

    // Find root node
    const root =
        nodes.find(
            (node) =>
                !edges.some((edge) => edge.target === node.id)
        ) || nodes[0];

    const visited = new Set();

    function arrange(nodeId, x, y) {
        visited.add(nodeId);

        const children = edges.filter(
            (edge) => edge.source === nodeId
        );

        const current = nodes.find(
            (node) => node.id === nodeId
        );

        if (current) {
            current.position = { x, y };
        }

        const total = children.length;

        children.forEach((edge, index) => {
            const childX =
                x +
                (index - (total - 1) / 2) *
                HORIZONTAL_GAP;

            const childY =
                y + VERTICAL_GAP;

            if (!visited.has(edge.target)) {
                arrange(
                    edge.target,
                    childX,
                    childY
                );
            }
        });
    }

    arrange(root.id, 0, 0);

    return [...nodes];
}