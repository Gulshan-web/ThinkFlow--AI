export async function expandNode(topic) {

    const res = await fetch(
        "http://localhost:5000/api/expand",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic
            })
        }
    );

    if (!res.ok)
        throw new Error("Expand failed");

    return await res.json();
}