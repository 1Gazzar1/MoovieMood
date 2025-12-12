import { useContext, useState } from "react";
import styles from "./AiChat.module.css";
import FilmIcon from "../icons/FilmIcon";
import NewChatIcon from "../icons/NewChatIcon";
import { getAiResponse, getCombinedLists } from "../../util/aiChatUtil";
import Markdown from "markdown-to-jsx";
import { LibraryContext } from "../../Context/LibraryContext/LibraryContextHook";

export function AiChat() {
    const [AiMessages, setAiMessages] = useState([
        `What's your Mood Today ? 🍿`,
    ]);
    const [userMessages, setUserMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [displayChat, setDisplayChat] = useState(false);
    const { ids } = useContext(LibraryContext);

    function resetChat() {
        setAiLoading(false);
        setAiMessages([`What's your Mood Today ? 🍿`]);
        setUserMessages([]);
        setUserInput("");
    }
    async function formOnSubmit(e) {
        e.preventDefault();
        if (!userInput.trim()) return;

        setUserInput("");
        setUserMessages((msgs) => [...msgs, userInput]);

        await addAiMessage(userInput);
    }

    async function addAiMessage(userInput) {
        setAiLoading(true);
        try {
            const res = await getAiResponse(
                userInput,
                AiMessages,
                userMessages,
                ids,
            );
            setAiMessages((msgs) => [...msgs, res.data.response]);
        } catch (error) {
            console.error(error.message);
            setAiMessages((msgs) => [
                ...msgs,
                "something went wrong 🤕, please try again later",
            ]);
        } finally {
            setAiLoading(false);
        }
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
            <button
                className={styles.chatButton}
                onClick={() => setDisplayChat(!displayChat)}
            >
                <FilmIcon />
            </button>
            {displayChat && (
                <div className={`${styles.chatContainer}`}>
                    <button onClick={resetChat} className={styles.resetButton}>
                        <NewChatIcon />
                    </button>
                    <div className={styles.messagesContainer}>
                        {getMessages()}
                    </div>
                    <form className={styles.inputArea} onSubmit={formOnSubmit}>
                        <textarea
                            className={styles.inputField}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault(); // prevent new line
                                    formOnSubmit(e); // your submit handler
                                }
                            }}
                        />
                        <button
                            id="submit"
                            className={styles.sendButton}
                            disabled={!userInput.trim() || aiLoading}
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export function Message({ message, Ai }) {
    return (
        <div className={`${styles.message} ${Ai ? styles.ai : ""}`}>
            <Markdown>{message}</Markdown>
        </div>
    );
}

export default AiChat;
