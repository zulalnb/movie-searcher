import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Movies {
  Search: Search[];
  totalResults: string;
  Response: string;
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MoviesState {
  data: Movies | null;
  loading: boolean;
  error: string;
}

export interface MovieDetailState {
  data: MovieDetail | null;
  loading: boolean;
  error: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface InitialState {
  movies: MoviesState;
  movieDetail: MovieDetailState;
}

const initialState: InitialState = {
  movies: {
    data: null,
    loading: false,
    error: "",
  },
  movieDetail: {
    data: null,
    loading: false,
    error: "",
  },
};

export const fetchMovies = createAsyncThunk(
  "fetchMovies",
  async (args: {
    title: string;
    page: number;
    year?: number | "";
    type?: "movie" | "series" | "episode" | "all";
  }) => {
    let endpoint = `http://www.omdbapi.com/?s=${args.title}&page=${args.page}`;
    
    if (args.type && args.type !== "all") {
      endpoint += `&type=${args.type}`;
    }
    if (args.year) {
      endpoint += `&y=${args.year}`;
    }
    endpoint += `&apikey=${import.meta.env.VITE_API_KEY}`;

    const response = await axios.get<Movies>(endpoint);

    return response.data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "fetchMovieDetail",
  async (id: string) => {
    const api = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${
      import.meta.env.VITE_API_KEY
    }`;

    const response = await axios.get<MovieDetail>(api);

    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.movies.loading = true;
      state.movies.error = "";
    });
    builder.addCase(
      fetchMovies.fulfilled,
      (state, action: PayloadAction<Movies>) => {
        state.movies.data = action.payload;
        state.movies.loading = false;
      }
    );
    builder.addCase(fetchMovies.rejected, (state) => {
      state.movies.loading = false;
      state.movies.error = "Error fetching movies data";
    });
    builder.addCase(fetchMovieDetail.pending, (state) => {
      state.movieDetail.loading = true;
      state.movieDetail.error = "";
    });
    builder.addCase(
      fetchMovieDetail.fulfilled,
      (state, action: PayloadAction<MovieDetail>) => {
        state.movieDetail.data = action.payload;
        state.movieDetail.loading = false;
      }
    );
    builder.addCase(fetchMovieDetail.rejected, (state) => {
      state.movieDetail.loading = false;
      state.movieDetail.error = "Error fetching movie detail";
    });
  },
});

export default moviesSlice.reducer;
