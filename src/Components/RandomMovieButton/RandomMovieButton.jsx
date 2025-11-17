import { useContext, useMemo } from "react";
import { MovieContext } from "../../Context/MovieContext/MovieContextHook";
import { useNavigate } from "react-router-dom";
import styles from "./RandomMovieButton.module.css";
function RandomMovieButton() {
    const { allMovies } = useContext(MovieContext);
    const navigate = useNavigate();
    const movieIds = useMemo(
        () =>
            allMovies &&
            allMovies.length > 0 &&
            allMovies.map((movie) => movie.id),

        [allMovies],
    );
    const randomIndex = Math.ceil(Math.random() * movieIds.length);
    const randomId = movieIds[randomIndex];
    return (
        <button
            className={styles.randomMovieButton}
            onClick={() => navigate(`/movie/${randomId}?random=true`)}
        >
            🎲 Get Random Movie
        </button>
    );
}

export default RandomMovieButton;
