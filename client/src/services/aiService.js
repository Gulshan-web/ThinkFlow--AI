import { aiAction } from "./aiActions";

/* ==============================
   Generate Mind Map
============================== */

export async function generateMindMap(topic) {
    return await aiAction("generate", topic);
}

/* ==============================
   Expand Node
============================== */

export async function expandMindMapNode(topic) {
    return await aiAction("expand", topic);
}

/* ==============================
   Explain Node
============================== */

export async function explainMindMapNode(topic) {
    return await aiAction("explain", topic);
}

/* ==============================
   AI Chat
============================== */

export async function chatWithAI(topic, question, history = []) {

    return await aiAction("chat", {
        topic,
        question,
        history,
    });

}