import "dotenv/config";
import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

router.post("/generate", async (req, res) => {
    try {
        const { idea } = req.body;

        if (!idea) {
            return res.status(400).json({
                error: "Idea is required",
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 1000,
            messages: [
                {
                    role: "system",
                    content: `
You are an AI Mind Map Generator.

Return ONLY valid JSON.

Format:

{
  "title":"Main Topic",
  "children":[
    {
      "title":"Branch",
      "children":[
        {
          "title":"Sub Branch"
        }
      ]
    }
  ]
}
`,
                },
                {
                    role: "user",
                    content: idea,
                },
            ],
        });

        const text = completion.choices[0].message.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        res.json(JSON.parse(text));
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/expand", async (req, res) => {
    try {

        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                error: "Topic is required",
            });
        }

        const response = await groq.chat.completions.create({
            
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content:
                        "Return ONLY JSON."
                },
                {
                    role: "user",
                    content: `
Expand this topic into mind map children.

Topic:
${topic}

Return only JSON.

{
   "children":[
      {"title":"Item 1"},
      {"title":"Item 2"},
      {"title":"Item 3"}
   ]
}
`
                }
            ],

            max_tokens: 300,
            temperature: 0.7
        });

        const raw = response.choices[0].message.content;

console.log(raw);

const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

try {
    res.json(JSON.parse(cleaned));
}
catch {

    res.json({

        title: topic,

        summary: cleaned,

        keyPoints: []

    });

}

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }
});

router.post("/explain", async (req, res) => {
    try {

        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                error: "Topic is required",
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 700,
            messages: [
                {
                    role: "system",
                    content: `
You are an AI tutor.

Return ONLY valid JSON.

Format:

{
  "title":"Topic",
  "summary":"2-4 paragraph explanation",
  "keyPoints":[
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4"
  ]
}
`
                },
                {
                    role: "user",
                    content: topic,
                },
            ],
        });

        router.post("/explain", async (req, res) => {
    try {

        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                error: "Topic is required",
            });
        }

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            max_tokens: 600,
            messages: [
                {
                    role: "system",
                    content: `
You are an expert teacher.

Explain the topic clearly using plain text.

Do NOT return JSON.
Do NOT use markdown.
Do NOT use code blocks.
`
                },
                {
                    role: "user",
                    content: topic
                }
            ]
        });

        const explanation = response.choices[0].message.content.trim();

        return res.json({
            title: topic,
            summary: explanation,
            keyPoints: []
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: err.message
        });

    }
});
    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message,
        });

    }
});



export default router;