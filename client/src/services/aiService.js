import { apiRequest } from "./api";

export async function generateMindMap(topic) {
    try {
        const result = await apiRequest(
            "gemini-2.0-flash",
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `
Generate a hierarchical mind map about:

${topic}

Return JSON only.
`,
                            },
                        ],
                    },
                ],
            }
        );

        return result;

    } catch (error) {
        console.error(error);

        return null;
    }
}