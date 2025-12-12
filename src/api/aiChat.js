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

function routerAi(userMessage) {
    return axios({
        url: `${API_URL}/ai`,
        method: "post",
        data: {
            q: `
                You are a classifier for a movie website.
                Your job: decide if the assistant must perform a database search
                to answer the user's message.

                Respond with EXACTLY one word: "YES" or "NO".
                No explanations.
                Message: "${userMessage}"
                            `.trim(),
        },
    });
}
export async function needsRAG(userMessage) {
    const res = await routerAi(userMessage);
    return res.data.response.trim() === "YES";
}
