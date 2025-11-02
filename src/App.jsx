import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
import DropdownMenu from "./Components/DropdownMenu/DropdownMenu";
import { AnimatePresence } from "framer-motion";
import { LibraryProvider } from "./Context/LibraryContext/LibraryContext";
import MovieLibrary from "./Pages/MovieLibrary";
function App() {
    return (
        <>
            <AnimatePresence mode="wait">
                <BrowserRouter>
                    <MovieProvider>
                        <LibraryProvider>
                            <DropdownMenu />
                            <Routes>
                                <Route
                                    key={"home"}
                                    path="/"
                                    element={<Home />}
                                />
                                <Route
                                    key={"movieDetails"}
                                    path="/movie/:id"
                                    element={<MovieDetails />}
                                />
                                <Route
                                    key={"library"}
                                    path="/library"
                                    element={<MovieLibrary />}
                                />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </LibraryProvider>
                    </MovieProvider>
                </BrowserRouter>
            </AnimatePresence>
        </>
    );
}

export default App;
