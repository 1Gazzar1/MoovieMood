// util export functions
export function getTotalMovies(movies) {
    if (movies) return movies.length;
    return 0;
}
export function getAvgRating(movies) {
    if (movies)
        return (
            movies.reduce((acc, movie) => acc + movie.vote_average, 0) /
            movies.length
        ).toFixed(1);
}
export function getMostNWatchedGenres(movies, noGenres = 4) {
    const data = {};
    movies.forEach((movie) => {
        for (const genre of movie.genres) {
            if (data[genre]) data[genre] += 1;
            else data[genre] = 1;
        }
    });

    return Object.keys(data)
        .map((genre) => {
            return { name: genre, value: data[genre] };
        })
        .sort((a, b) => a.value - b.value)
        .slice(0, noGenres);
}
export function getPastNMonths(n = 6) {
    let now = Date.now();
    let output = [];
    for (let i = 0; i < n; i++) {
        const temp = new Date(now);
        output.push(temp.toISOString().slice(0, 7));
        now -= 1000 * 60 * 60 * 24 * 30;
    }
    return output.reverse();
}
export function getMostNWatchedActors(movies, noActors = 6) {
    const data = {};
    movies.forEach((movie) => {
        for (const cast of movie.cast) {
            if (data[cast]) data[cast] += 1;
            else data[cast] = 1;
        }
    });

    return Object.keys(data)
        .map((cast) => {
            return { name: cast, value: data[cast] };
        })
        .sort((a, b) => a.value - b.value)
        .slice(0, noActors);
}
export function getWatchedMoviesPerMonth(movies, noMonths,getMovieWatchedAt) {
    const pastMonths = getPastNMonths(noMonths);
    const data = {};
    movies.forEach((movie) => {
        const date = getMovieWatchedAt(movie.id).slice(0, 7);
        if (!pastMonths.includes(date)) return;
        if (data[date]) data[date]++;
        else data[date] = 1;
    });

    return Object.keys(data).map((str) => {
        return { name: str, value: data[str] };
    });
}
