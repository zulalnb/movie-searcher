import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchMovies } from "./features/moviesSlice";

function App() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("Pokemon");
  const [year, setYear] = useState<number | "">("");
  const [type, setType] = useState<"movie" | "series" | "episode" | null>(null);

  const movies = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies({ title, page }));
  }, []);

  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchMovies({ title, page: value, year, type }));
  };

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const toggleType = (value: "movie" | "series" | "episode") => {
    setType((prevType) => (prevType !== value ? value : null));
    setPage(1);
    dispatch(
      fetchMovies({ title, page: 1, year, type: type !== value ? value : null })
    );
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Stack direction="row" my={4} spacing={3}>
          <TextField
            id="outlined-basic"
            label="Type movie"
            variant="outlined"
            value={title}
            onChange={handleText}
          />
          <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            value={year}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setYear(Number(event.target.value));
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setPage(1);
              dispatch(fetchMovies({ title, page: 1, year }));
            }}
          >
            Search
          </Button>
        </Stack>
        <Stack direction="row" my={4} spacing={3}>
          <Button
            variant={type === "movie" ? "contained" : "outlined"}
            onClick={() => {
              toggleType("movie");
            }}
          >
            movies
          </Button>
          <Button
            variant={type === "series" ? "contained" : "outlined"}
            onClick={() => {
              toggleType("series");
            }}
          >
            TV series
          </Button>
          <Button
            variant={type === "episode" ? "contained" : "outlined"}
            onClick={() => {
              toggleType("episode");
            }}
          >
            TV series episodes
          </Button>
        </Stack>
        {movies.data && movies.data.Search && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Release Date</TableCell>
                  <TableCell align="right">IMDb ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.data.Search.map((movie) => (
                  <TableRow
                    key={movie.imdbID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {movie.Title}
                    </TableCell>
                    <TableCell align="right">{movie.Year}</TableCell>
                    <TableCell align="right">{movie.imdbID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {movies.data && movies.data.Search && (
          <Stack my={4} alignItems="center">
            <Pagination
              count={Math.round(parseInt(movies.data.totalResults) / 10)}
              page={page}
              onChange={handlePagination}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default App;
