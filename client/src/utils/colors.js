export const NODE_COLORS = [
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#10b981",
    "#22c55e",
    "#eab308",
    "#f97316",
    "#ef4444",
    "#64748b",
];

export function getRandomColor() {
    return NODE_COLORS[
        Math.floor(Math.random() * NODE_COLORS.length)
    ];
}

export function getColor(index) {
    return NODE_COLORS[index % NODE_COLORS.length];
}