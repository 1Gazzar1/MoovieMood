import { useContext } from "react";
import styles from "./WatchedAt.module.css";
import { LibraryContext } from "../../Context/LibraryContext/LibraryContextHook";

function WatchedAt({ movieId }) {
    const { isWatched, getMovieWatchedAt } = useContext(LibraryContext);
    const watchedDate = isWatched(movieId) && getMovieWatchedAt(movieId);
    return (
        <>
            {watchedDate && (
                <div className={`${styles.watchIndicator} ${styles.slideIn}`}>
                    <span className={styles.watchIcon}>👁️</span>
                    <span className={styles.watchText}>
                        Watched {formatWatchedDate(watchedDate)}
                    </span>
                </div>
            )}
        </>
    );
}

export default WatchedAt;

// Function to format the watched date
const formatWatchedDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 1) return "Today";
    if (Math.floor(diffDays) === 1) return "Yesterday";
    if (diffDays < 7) return `${Math.floor(diffDays)} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
};
