import { sendChatMessage } from "./chat";

import {
    generateMindMap,
    expandNode,
    explainNode,
} from "./api";

export async function aiAction(type, payload) {

    switch (type) {

        case "generate":
            return await generateMindMap(payload);

        case "expand":
            return await expandNode(payload);

        case "explain":
            return await explainNode(payload);

        case "chat":

            return await sendChatMessage(

                payload.topic,

                payload.question,

                payload.history || []

            );

        default:

            throw new Error(`Unknown AI action: ${type}`);

    }

}