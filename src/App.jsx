import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
import { AnimatePresence } from "framer-motion";
import { LibraryProvider } from "./Context/LibraryContext/LibraryContext";
import MovieLibrary from "./Pages/MovieLibrary";
import NavBarLayout from "./Layouts/NavBarLayout";
import Profile from "./Pages/Profile";

function App() {
    const routes = [
        {
            path: "/",
            element: <NavBarLayout />,
            errorElement: <Error />,
            children: [
                { index: true, element: <Home /> },
                { path: "movie/:id", element: <MovieDetails /> },
                { path: "library", element: <MovieLibrary /> },
                {
                    path: "profile",
                    element: <Profile />,
                },
            ],
        },
    ];
    const router = createBrowserRouter(routes);
    return (
        <>
            <AnimatePresence mode="wait">
                <MovieProvider>
                    <LibraryProvider>
                        <RouterProvider router={router} />
                    </LibraryProvider>
                </MovieProvider>
            </AnimatePresence>
        </>
    );
}

export default App;
