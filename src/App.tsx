import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchMovies } from "./features/moviesSlice";

function App() {
  const movies = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <div>
      {movies.data &&
        movies.data.Search.map((movie, index) => (
          <div key={movie.imdbID}>
            {index + 1}. Name: {movie.Title} Date: {movie.Year} IMDb ID:{" "}
            {movie.imdbID}{" "}
          </div>
        ))}
    </div>
  );
}

export default App;
