const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

export async function sendChatMessage(

    topic,

    question,

    history = []

) {

    const response = await fetch(`${API}/chat`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

        },

        body: JSON.stringify({

            topic,

            question,

            history,

        }),

    });

    if (!response.ok) {

        throw new Error("Failed to get AI response");

    }

    return await response.json();

}