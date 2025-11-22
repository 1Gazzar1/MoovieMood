import { useState } from "react";
import styles from "./AiChat.module.css";
import FilmIcon from "../icons/FilmIcon";

function AiChat() {
    const [displayChat, setDisplayChat] = useState(false);

    return (
        <>
            <button
                className={styles.chatButton}
                onClick={() => setDisplayChat(!displayChat)}
            >
                <FilmIcon />
            </button>
            {displayChat && (
                <div className={`${styles.chatContainer}`}>
                    <Chat />
                </div>
            )}
        </>
    );
}

export function Chat() {
    const [AiMessages, setAiMessages] = useState([
        `What's your Mood Today ? 🍿`,
    ]);
    const [userMessages, setUserMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [aiLoading, setAiLoading] = useState(false);

    async function sendButtonOnClick() {
        if (!userInput.trim()) return;

        setUserInput("");
        setUserMessages((msgs) => [...msgs, userInput]);

        await getAiResponse();
    }

    async function getAiResponse() {
        setAiLoading(true);
        await sleep(2000);
        setAiLoading(false);
        setAiMessages((msgs) => [...msgs, "ai response"]);
    }

    function getMessages() {
        let messages = [];
        const combinedLen = AiMessages.length + userMessages.length;
        for (let i = 0; i < combinedLen; i++) {
            if (i % 2 == 0)
                messages.push(
                    <Message
                        key={`ai-${i}`}
                        message={AiMessages[Math.floor(i / 2)]}
                        Ai={true}
                    />,
                );
            else
                messages.push(
                    <Message
                        key={`user-${i}`}
                        message={userMessages[Math.floor(i / 2)]}
                        Ai={false}
                    />,
                );
        }
        return messages;
    }

    return (
        <>
            <div className={styles.messagesContainer}>{getMessages()}</div>
            <form className={styles.inputArea} onSubmit={sendButtonOnClick}>
                <input
                    type="text"
                    className={styles.inputField}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className={styles.sendButton}
                    onClick={sendButtonOnClick}
                    disabled={!userInput.trim() || aiLoading}
                >
                    Send
                </button>
            </form>
        </>
    );
}

export function Message({ message, Ai }) {
    return (
        <span className={`${styles.message} ${Ai ? styles.ai : ""}`}>
            {message}
        </span>
    );
}

export default AiChat;

export function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
