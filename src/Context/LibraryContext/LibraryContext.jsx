import { useEffect, useState, useContext } from "react";
import { LibraryContext } from "./LibraryContextHook";
import { MovieContext } from "../MovieContext/MovieContextHook";
import { getMoviesByIds } from "../../Services/movie_searcher";

// format of the library object
// there is no watched prop, because if it's in the list it means it's watched
// {
//     id : number ,
//     favorited : bool,
//     watchedAt: formatDate()
// }[]
export function LibraryProvider({ children }) {
    const [library, setLibrary] = useState(
        JSON.parse(localStorage.getItem("library")) || [],
    );
    // so i can fetch it through ids
    const { allMovies } = useContext(MovieContext);

    useEffect(() => {
        localStorage.setItem("library", JSON.stringify(library));
    }, [library]);

    const isWatched = (id) => {
        return library.some((m) => m.id === id);
    };
    const addWatchedMovie = (id) => {
        setLibrary((l) => [
            ...l,
            { id: id, favorited: false, watchedAt: formatDate(Date.now()) },
        ]);
    };
    const unWatchMovie = (newId) => {
        // make sure you can't un watch if it's already favorited.

        setLibrary((l) =>
            l.filter((m) => {
                if (m.id === newId && m.favorited === false) return false;
                else return true;
            }),
        );
    };
    const isFavorited = (id) => {
        return library.some((m) => m.id === id && m.favorited === true);
    };
    const favoriteMovie = (id) => {
        // if movie is watched then just favorite it.
        // if movie isn't watched, add it as watched and favorite it.
        isWatched(id)
            ? setLibrary((l) =>
                  l.map((m) => (m.id === id ? { ...m, favorited: true } : m)),
              )
            : setLibrary((l) => [
                  ...l,
                  {
                      id: id,
                      favorited: true,
                      watchedAt: formatDate(Date.now()),
                  },
              ]);
    };
    const unFavoriteMovie = (newId) => {
        setLibrary((l) =>
            l.map((m) => {
                if (m.id === newId) return { ...m, favorited: false };
                else return m;
            }),
        );
    };
    const getMovieWatchedAt = (id) => {
        return library.find((m) => m.id === id).watchedAt;
    };
    const movies = getMoviesByIds(
        allMovies,
        library.map((m) => m.id),
    );

    const contextValue = {
        isWatched,
        addWatchedMovie,
        unWatchMovie,
        isFavorited,
        favoriteMovie,
        unFavoriteMovie,
        getMovieWatchedAt,
        movies,
    };
    return (
        <LibraryContext.Provider value={contextValue}>
            {children}
        </LibraryContext.Provider>
    );
}

function formatDate(date) {
    return new Date(date).toISOString().slice(0, 10);
}
