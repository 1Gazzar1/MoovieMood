import { getAiResponse_ai, getAiResponse_RAG, needsRAG } from "../api/aiChat";

export function formatAiQuery(messages) {
    // messages is a list of ai and user message.
    // ai is the first message and then user, etc..

    return (
        `You're a AI Assistant in a MOVIE website\n
            DON'T respond to un-related stuff\n` +
        messages
            .map((msg, i) =>
                i % 2 === 0 ? `You said: ${msg}` : `User replied: ${msg}`,
            )
            .join("\nThen\n")
    );
}

export function getCombinedLists(list1, list2) {
    let messages = [];
    const combinedLen = list1.length + list2.length;
    for (let i = 0; i < combinedLen; i++) {
        if (i % 2 == 0) messages.push(list1[Math.floor(i / 2)]);
        else messages.push(list2[Math.floor(i / 2)]);
    }
    return messages;
}
export async function getAiResponse(userInput, prevAiMsgs, prevUserMsgs) {
    let res;
    const RAG = await needsRAG(userInput);
    if (RAG) {
        res = await getAiResponse_RAG(userInput);
    } else {
        const formattedMsgs = formatAiQuery([
            ...getCombinedLists(prevAiMsgs, prevUserMsgs),
            userInput,
        ]);
        res = await getAiResponse_ai(formattedMsgs);
    }
    return res;
}
