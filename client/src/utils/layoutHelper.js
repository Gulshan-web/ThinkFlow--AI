/**
 * Horizontal Layout
 */

export function horizontalLayout(nodes) {
    return nodes.map((node, index) => ({
        ...node,
        position: {
            x: index * 260,
            y: 200,
        },
    }));
}

/**
 * Vertical Layout
 */

export function verticalLayout(nodes) {
    return nodes.map((node, index) => ({
        ...node,
        position: {
            x: 300,
            y: index * 170,
        },
    }));
}

/**
 * Circle Layout
 */

export function circleLayout(nodes) {
    const radius = 300;

    return nodes.map((node, index) => {
        const angle =
            (2 * Math.PI * index) / nodes.length;

        return {
            ...node,

            position: {
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle),
            },
        };
    });
}

/**
 * Grid Layout
 */

export function gridLayout(nodes) {
    return nodes.map((node, index) => ({
        ...node,

        position: {
            x: (index % 4) * 250,
            y: Math.floor(index / 4) * 180,
        },
    }));
}