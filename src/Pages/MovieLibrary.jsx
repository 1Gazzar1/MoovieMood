import { useEffect, useState, useContext } from "react";
import Card from "../Components/Card/Card";
import "../Styles/MovieLibrary.css";
import { filterMovies } from "../Services/movie_searcher";
import SearchBar from "../Components/SearchBar/SearchBar";
import { motion as Motion } from "framer-motion";
import { LibraryContext } from "../Context/LibraryContext/LibraryContextHook";
import NoMovies from "../Components/NoMovies/NoMovies";

function MovieLibrary() {
    const { isFavorited, movies } = useContext(LibraryContext);
    const [shownMovies, setShownMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [showLiked, setShowLiked] = useState(true);

    useEffect(() => {
        setShownMovies(
            filterMovies(movies, {
                title: search,
                voteCount: 10,
                rating: 6,
                cast: [],
                releaseDate: 1950,
                genres: [],
            }),
        );
    }, [search, movies]);
    const displayedMovies = showLiked
        ? shownMovies
        : shownMovies.filter((m) => !isFavorited(m.id));

    return (
        <Motion.div
            initial={{
                x: 20,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: 20,
                opacity: 0,
            }}
            transition={{ duration: 0.4, type: "ease" }}
        >
            {movies && movies.length > 0 ? (
                <>
                    <div className="searchBar">
                        <SearchBar
                            labelText={"Title"}
                            searchVal={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="like-btn">
                        <label htmlFor="switch">Show Liked</label>
                        <div className="toggle-btn">
                            <input
                                type="checkbox"
                                id="switch"
                                onChange={() => setShowLiked(!showLiked)}
                                checked={showLiked}
                            />
                            <label htmlFor="switch"></label>
                        </div>
                    </div>

                    <div className="cardList">
                        {displayedMovies.map((m) => (
                            <Card key={m.id} movie={m} />
                        ))}
                    </div>
                </>
            ) : (
                <NoMovies />
            )}
        </Motion.div>
    );
}

export default MovieLibrary;
