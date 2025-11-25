import { useState } from "react";
import styles from "./AiChat.module.css";
import FilmIcon from "../icons/FilmIcon";
import {
    getAiResponse_ai,
    getAiResponse_RAG,
    needsRAG,
} from "../../api/aiChat";
import { formatAiQuery } from "../../util/formatQueryUtil";

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

        await getAiResponse(userInput);
    }

    async function getAiResponse(userInput) {
        setAiLoading(true);

        let res;
        const RAG = await needsRAG(userInput);
        console.log(RAG);
        if (RAG) {
            res = await getAiResponse_RAG(userInput);
        } else {
            const formattedMsgs = formatAiQuery([
                ...getCombinedLists(AiMessages, userMessages),
                userInput,
            ]);
            console.log(formattedMsgs);
            res = await getAiResponse_ai(formattedMsgs);
        }

        setAiLoading(false);
        setAiMessages((msgs) => [...msgs, res.data.response]);
    }

    function getMessages() {
        const combinedList = getCombinedLists(AiMessages, userMessages);
        return combinedList.map((msg, i) => {
            return i % 2 === 0 ? (
                <Message key={`ai-${i}`} message={msg} Ai={true} />
            ) : (
                <Message key={`user-${i}`} message={msg} Ai={false} />
            );
        });
    }

    return (
        <>
            <div className={styles.messagesContainer}>{getMessages()}</div>
            <form className={styles.inputArea} onSubmit={sendButtonOnClick}>
                <input
                    id="user-text-input"
                    type="text"
                    className={styles.inputField}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    id="submit"
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

function getCombinedLists(list1, list2) {
    let messages = [];
    const combinedLen = list1.length + list2.length;
    for (let i = 0; i < combinedLen; i++) {
        if (i % 2 == 0) messages.push(list1[Math.floor(i / 2)]);
        else messages.push(list2[Math.floor(i / 2)]);
    }
    return messages;
}
