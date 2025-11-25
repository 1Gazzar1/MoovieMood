export function formatAiQuery(messages) {
    // messages is a list of ai and user message.
    // ai is the first message and then user, etc..

    return (
        `You're a AI Assistant in a movie website\n` +
        messages
            .map((msg, i) =>
                i % 2 === 0 ? `You said: ${msg}` : `User replied: ${msg}`,
            )
            .join("\nThen\n")
    );
}
