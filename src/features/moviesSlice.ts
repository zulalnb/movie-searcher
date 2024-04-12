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

export interface MovieState {
  data: Movies | null;
  loading: boolean;
  error: string;
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: "",
};

export const fetchMovies = createAsyncThunk(
  "fetchMovies",
  async (args: {
    title: string;
    page: number;
    year?: number | "";
    type?: "movie" | "series" | "episode" | null;
  }) => {
    let endpoint = `http://www.omdbapi.com/?s=${args.title}&page=${args.page}`;

    if (args.type) {
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

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchMovies.fulfilled,
      (state, action: PayloadAction<Movies>) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching movies data";
    });
  },
});

export default moviesSlice.reducer;
