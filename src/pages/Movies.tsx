import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
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
import { useAppDispatch, useAppSelector } from "../store";
import { fetchMovies } from "../features/moviesSlice";

function Movies() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const title = query.get("title") || "Pokemon";
  const year = Number(query.get("year")) || "";
  const type =
    (query.get("type") as "movie" | "series" | "episode" | "all") ?? "all";
  const [searchedTitle, setSearchedTitle] = useState(title);
  const [filteredYear, setFilteredYear] = useState<number | "">(year);

  const movies = useAppSelector((state) => state.movies.movies);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const page = parseInt(query.get("page") || "1", 10);

  useEffect(() => {
    dispatch(fetchMovies({ title, page, year, type }));
  }, []);

  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(fetchMovies({ title, page: value, year, type }));
  };

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedTitle(event.target.value);
  };

  const toggleType = (value: "movie" | "series" | "episode") => {
    let route = `/?title=${title}`;
    if (year) {
      route += `&year=${year}`;
    }
    if (value !== type) {
      route += `&type=${value}`;
    }
    navigate(route);
    dispatch(
      fetchMovies({
        title,
        page: 1,
        year,
        type: type !== value ? value : "all",
      })
    );
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Stack direction="row" my={4} spacing={3}>
          <TextField
            id="outlined-basic"
            label="Search movie"
            placeholder="Search movie"
            variant="outlined"
            value={searchedTitle}
            onChange={handleText}
          />
          <TextField
            id="outlined-basic"
            label="Year"
            placeholder="Year"
            variant="outlined"
            value={filteredYear}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const isValid =
                Number(event.target.value) &&
                (Number(event.target.value[0]) === 1 ||
                  Number(event.target.value[0]) === 2);
              if (event.target.value.length < 5) {
                setFilteredYear(isValid ? Number(event.target.value) : "");
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (searchedTitle) {
                let route = `/?title=${searchedTitle}`;
                if (filteredYear) {
                  route += `&year=${filteredYear}`;
                }
                navigate(route);
                dispatch(
                  fetchMovies({
                    title: searchedTitle,
                    page: 1,
                    year: filteredYear,
                  })
                );
              }
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
                    style={{ cursor: "pointer" }}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                    onClick={() => navigate(`/movies/${movie.imdbID}`)}
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
              count={Math.max(
                Math.round(parseInt(movies.data.totalResults) / 10),
                1
              )}
              page={page}
              onChange={handlePagination}
              renderItem={(item) => {
                let route = `/?title=${title}`;
                if (year) {
                  route += `&year=${year}`;
                }
                if (type) {
                  route += `&type=${type}`;
                }
                route += item.page === 1 ? "" : `&page=${item.page}`;
                return <PaginationItem component={Link} to={route} {...item} />;
              }}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default Movies;
