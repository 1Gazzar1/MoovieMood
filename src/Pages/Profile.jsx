import { useContext } from "react";
import { LibraryContext } from "../Context/LibraryContext/LibraryContextHook";
import ProfileCard from "../Components/ProfileCard/ProfileCard";
import "../Styles/Profile.css";
import { PieChartWithCustomizedLabel } from "../Components/PieChart/PieChartWithCustomizedLabel";
import CustomBarChart from "../Components/BarChart/CustomBarChart";

// library format : { id : number,favorited:bool, watchedAt: dateString}
function Profile() {
    const { movies, getMovieWatchedAt } = useContext(LibraryContext);
    const COLORS = ["#8884d8", "#7a76c2", "#5e5b96", "#535285"];
    const numberOfMovies = getTotalMovies(movies);
    const watchedGenres = getMostNWatchedGenres(movies, 4);
    const watchedActors = getMostNWatchedActors(movies, 5);
    function getWatchedMoviesPerMonth(movies, noMonths) {
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

    return (
        <>
            <div className="profileCardContainer">
                {/* total movies watched card */}
                <ProfileCard
                    title={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM144 432L144 464C144 472.8 151.2 480 160 480L192 480C200.8 480 208 472.8 208 464L208 432C208 423.2 200.8 416 192 416L160 416C151.2 416 144 423.2 144 432zM448 416C439.2 416 432 423.2 432 432L432 464C432 472.8 439.2 480 448 480L480 480C488.8 480 496 472.8 496 464L496 432C496 423.2 488.8 416 480 416L448 416zM144 304L144 336C144 344.8 151.2 352 160 352L192 352C200.8 352 208 344.8 208 336L208 304C208 295.2 200.8 288 192 288L160 288C151.2 288 144 295.2 144 304zM448 288C439.2 288 432 295.2 432 304L432 336C432 344.8 439.2 352 448 352L480 352C488.8 352 496 344.8 496 336L496 304C496 295.2 488.8 288 480 288L448 288zM144 176L144 208C144 216.8 151.2 224 160 224L192 224C200.8 224 208 216.8 208 208L208 176C208 167.2 200.8 160 192 160L160 160C151.2 160 144 167.2 144 176zM448 160C439.2 160 432 167.2 432 176L432 208C432 216.8 439.2 224 448 224L480 224C488.8 224 496 216.8 496 208L496 176C496 167.2 488.8 160 480 160L448 160z" />
                            </svg>
                            <span>Watched Movies</span>
                        </>
                    }
                    content={numberOfMovies}
                    footer={"Rookie Numbers 🗿"}
                />
                {/* Average movie rating card */}
                <ProfileCard
                    title={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z" />
                            </svg>
                            <span>Average Rating</span>
                        </>
                    }
                    content={getAvgRating(movies)}
                    footer={`Based on ${numberOfMovies}`}
                />
                {/* Favorite Genre card */}
                <ProfileCard
                    title={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M256.5 37.6C265.8 29.8 279.5 30.1 288.4 38.5C300.7 50.1 311.7 62.9 322.3 75.9C335.8 92.4 352 114.2 367.6 140.1C372.8 133.3 377.6 127.3 381.8 122.2C382.9 120.9 384 119.5 385.1 118.1C393 108.3 402.8 96 415.9 96C429.3 96 438.7 107.9 446.7 118.1C448 119.8 449.3 121.4 450.6 122.9C460.9 135.3 474.6 153.2 488.3 175.3C515.5 219.2 543.9 281.7 543.9 351.9C543.9 475.6 443.6 575.9 319.9 575.9C196.2 575.9 96 475.7 96 352C96 260.9 137.1 182 176.5 127C196.4 99.3 216.2 77.1 231.1 61.9C239.3 53.5 247.6 45.2 256.6 37.7zM321.7 480C347 480 369.4 473 390.5 459C432.6 429.6 443.9 370.8 418.6 324.6C414.1 315.6 402.6 315 396.1 322.6L370.9 351.9C364.3 359.5 352.4 359.3 346.2 351.4C328.9 329.3 297.1 289 280.9 268.4C275.5 261.5 265.7 260.4 259.4 266.5C241.1 284.3 207.9 323.3 207.9 370.8C207.9 439.4 258.5 480 321.6 480z" />
                            </svg>
                            <span>Favorite Genre</span>
                        </>
                    }
                    content={watchedGenres[0] ? watchedGenres[0].name : ""}
                    footer={`Based on ${watchedGenres[0] ? watchedGenres[0].value : ""} Movies`}
                />
            </div>
            <div className="profileCardContainer">
                <ProfileCard
                    title={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                            </svg>
                            <b>No. Movies</b>
                        </>
                    }
                >
                    <CustomBarChart
                        data={getWatchedMoviesPerMonth(movies, 6)}
                    />
                </ProfileCard>
                <ProfileCard
                    title={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M96 96C113.7 96 128 110.3 128 128L128 464C128 472.8 135.2 480 144 480L544 480C561.7 480 576 494.3 576 512C576 529.7 561.7 544 544 544L144 544C99.8 544 64 508.2 64 464L64 128C64 110.3 78.3 96 96 96zM304 160C310.7 160 317.1 162.8 321.7 167.8L392.8 245.3L439 199C448.4 189.6 463.6 189.6 472.9 199L536.9 263C541.4 267.5 543.9 273.6 543.9 280L543.9 392C543.9 405.3 533.2 416 519.9 416L215.9 416C202.6 416 191.9 405.3 191.9 392L191.9 280C191.9 274 194.2 268.2 198.2 263.8L286.2 167.8C290.7 162.8 297.2 160 303.9 160z" />
                            </svg>
                            <b>Favorite Genres</b>
                        </>
                    }
                >
                    <PieChartWithCustomizedLabel
                        colors={COLORS}
                        data={watchedGenres}
                    ></PieChartWithCustomizedLabel>
                </ProfileCard>
            </div>
            <div className="profileCardContainer">
                <ProfileCard
                    title={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144C350.9 144 376 118.9 376 88zM400 300.7L446.3 363.1C456.8 377.3 476.9 380.3 491.1 369.7C505.3 359.1 508.3 339.1 497.7 324.9L427.2 229.9C402 196 362.3 176 320 176C277.7 176 238 196 212.8 229.9L142.3 324.9C131.8 339.1 134.7 359.1 148.9 369.7C163.1 380.3 183.1 377.3 193.7 363.1L240 300.7L240 576C240 593.7 254.3 608 272 608C289.7 608 304 593.7 304 576L304 416C304 407.2 311.2 400 320 400C328.8 400 336 407.2 336 416L336 576C336 593.7 350.3 608 368 608C385.7 608 400 593.7 400 576L400 300.7z" />
                            </svg>
                            <b>Most Watched Actors</b>
                        </>
                    }
                >
                    <CustomBarChart data={watchedActors} />
                </ProfileCard>
            </div>
        </>
    );
}

// util functions

function getTotalMovies(movies) {
    if (movies) return movies.length;
    return 0;
}
function getAvgRating(movies) {
    if (movies)
        return (
            movies.reduce((acc, movie) => acc + movie.vote_average, 0) /
            movies.length
        ).toFixed(1);
}
function getMostNWatchedGenres(movies, noGenres = 4) {
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
        .sort((a, b) => a.value > b.value)
        .slice(0, noGenres);
}
function getPastNMonths(n = 6) {
    let now = Date.now();
    let output = [];
    for (let i = 0; i < n; i++) {
        const temp = new Date(now);
        output.push(temp.toISOString().slice(0, 7));
        now -= 1000 * 60 * 60 * 24 * 30;
    }
    return output.reverse();
}
function getMostNWatchedActors(movies, noActors = 6) {
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
        .sort((a, b) => a.value > b.value)
        .slice(0, noActors);
}

export default Profile;
