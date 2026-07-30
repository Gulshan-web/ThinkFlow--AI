const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";
/* ---------------- Generate Mind Map ---------------- */

export async function generateMindMap(idea) {

    const response = await fetch(`${API}/generate`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            idea,
        }),

    });

    if (!response.ok) {
        throw new Error("Failed to generate mind map");
    }

    return await response.json();
}


/* ---------------- Expand Node ---------------- */

export async function expandNode(topic) {

    const response = await fetch(`${API}/expand`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            topic,
        }),

    });

    if (!response.ok) {
        throw new Error("Failed to expand node");
    }

    return await response.json();
}