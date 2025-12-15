import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function getAiResponse_RAG(q, userPreference, conversation) {
    // body should be a list of movie ids.
    // q is the query params
    return axios({
        url: `${API_URL}/rag`,
        method: "post",
        data: {
            q,
            userPreference,
            conversation,
        },
    });
}
export function getAiResponse_ai(q) {
    // q here is in the body
    return axios({
        url: `${API_URL}/ai`,
        method: "post",
        data: {
            q,
        },
    });
}

function routerAi(fullConversation) {
    return axios({
        url: `${API_URL}/ai`,
        method: "post",
        data: {
            q: `
                You are a classifier for a movie website.
                Your job: decide if the assistant must perform a database search
                to answer the user's last message/question.

                Respond with EXACTLY one word: "YES" or "NO".
                No explanations.
                The Conversation: "${fullConversation}"
                            `.trim(),
        },
    });
}
export async function needsRAG(fullConversation) {
    const res = await routerAi(fullConversation);
    return res.data.response.trim() === "YES";
}
