let nodeId = 1;

export function jsonToFlow(tree) {
    nodeId = 1;

    const nodes = [];
    const edges = [];

    function traverse(node, parent = null) {
        const id = String(nodeId++);

        nodes.push({
            id,
            type: "custom",

            position: {
                x: 0,
                y: 0,
            },

            data: {
                id,
                label: node.title,
                category: "AI",
                description: "",
                color: "#06b6d4",
            },
        });

        if (parent) {
            edges.push({
                id: `${parent}-${id}`,
                source: parent,
                target: id,
            });
        }

        node.children?.forEach((child) => {
            traverse(child, id);
        });
    }

    traverse(tree);

    return {
        nodes,
        edges,
    };
}