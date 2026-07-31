/**
 * Better Auto Layout Utility
 * Dynamic spacing to reduce node overlap
 */

const BASE_HORIZONTAL_GAP = 320;
const BASE_VERTICAL_GAP = 220;

export function autoLayout(nodes, edges) {
    if (!nodes.length) return nodes;

    const root =
        nodes.find(
            (node) =>
                !edges.some((edge) => edge.target === node.id)
        ) || nodes[0];

    const visited = new Set();

    function getChildren(nodeId) {
        return edges
            .filter((edge) => edge.source === nodeId)
            .map((edge) => edge.target);
    }

    // Count how many descendants this node has
    function getSubtreeSize(nodeId) {
        const children = getChildren(nodeId);

        if (children.length === 0) {
            return 1;
        }

        let size = 0;

        children.forEach((child) => {
            size += getSubtreeSize(child);
        });

        return Math.max(size, 1);
    }

    function arrange(nodeId, x, y) {
        visited.add(nodeId);

        const node = nodes.find((n) => n.id === nodeId);

        if (node) {
            node.position = { x, y };
        }

        const children = getChildren(nodeId);

        if (!children.length) return;

        const subtreeWidths = children.map(getSubtreeSize);

        const totalWidth =
            subtreeWidths.reduce((a, b) => a + b, 0) *
            BASE_HORIZONTAL_GAP;

        let currentX = x - totalWidth / 2;

        children.forEach((childId, index) => {

            const width =
                subtreeWidths[index] * BASE_HORIZONTAL_GAP;

            const childCenter =
                currentX + width / 2;

            arrange(
                childId,
                childCenter,
                y + BASE_VERTICAL_GAP
            );

            currentX += width;
        });
    }

    arrange(root.id, 0, 0);

    return [...nodes];
}