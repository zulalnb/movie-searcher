import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Movies />,
    },
    {
      path: "movies/:imdbId",
      element: <MovieDetail />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
