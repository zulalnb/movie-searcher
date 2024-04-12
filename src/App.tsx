import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchMovies } from "./features/moviesSlice";
import {
  Box,
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
} from "@mui/material";

function App() {
  const [page, setPage] = useState(1);

  const movies = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies({ title: "Pokemon", page }));
  }, []);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchMovies({ title: "Pokemon", page: value }));
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
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
              onChange={handleChange}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default App;
