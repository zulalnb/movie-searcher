import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  InputAdornment,
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
  styled,
  tableCellClasses,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchMovies } from "../features/moviesSlice";
import Navbar from "../components/Navbar";

const Input = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#FFFFFF",
    "& fieldset": {
      borderColor: "transparent",
      backgroundColor: "#FFFFFF0A",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused": {
      fieldset: {
        borderColor: "#3742fa",
      },
      "& .MuiInputAdornment-root": {
        color: "#3742fa",
      },
    },
    "& .MuiInputAdornment-root": {
      color: "#FFFFFF",
    },
  },
});

const StyledButton = styled(Button)({
  boxShadow: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#1D4ED8",
  color: "#FFFFFF",
  borderColor: "#1D4ED8",
  "&:hover": {
    backgroundColor: "#1d4fd8be",
    borderColor: "#1d4fd8be",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
});

const FilterButton = styled(StyledButton)<ButtonProps>(({ variant }) => ({
  backgroundColor: variant === "contained" ? "#3867d6" : "transparent",
  color: variant === "contained" ? "#FFFFFF" : "#3867d6",
  borderColor: "#3867d6",
  "&:hover": {
    backgroundColor: variant === "contained" ? "#3867d6d0" : "#cfddf61f",
    borderColor: variant === "contained" ? "#3867d6d0" : "#3887d6d0",
    color: variant === "contained" ? "#FFFFFF" : "#3887d6d0",
  },
}));

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2c3e50",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#FFFFFF",
    borderBottomColor: "#7f8c8d",
  },
});

const StyledTableRow = styled(TableRow)({
  backgroundColor: "#2c3e50",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

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
    <main>
      <Container>
        <Navbar />
        <Box sx={{ my: 4 }}>
          <Stack direction={{ md: "row" }} justifyContent="space-between">
            <Stack direction="row" my={4} spacing={3}>
              <Input
                id="outlined-basic"
                placeholder="Search movie"
                variant="outlined"
                size="small"
                value={searchedTitle}
                onChange={handleText}
              />
              <Input
                id="outlined-basic"
                placeholder="Year"
                variant="outlined"
                size="small"
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{ textTransform: "none" }}
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
              </StyledButton>
            </Stack>
            <Stack direction="row" my={4} spacing={3}>
              <FilterButton
                variant={type === "movie" ? "contained" : "outlined"}
                size="small"
                onClick={() => {
                  toggleType("movie");
                }}
              >
                movies
              </FilterButton>
              <FilterButton
                variant={type === "series" ? "contained" : "outlined"}
                size="small"
                onClick={() => {
                  toggleType("series");
                }}
              >
                TV series
              </FilterButton>
              <FilterButton
                variant={type === "episode" ? "contained" : "outlined"}
                size="small"
                onClick={() => {
                  toggleType("episode");
                }}
              >
                TV series episodes
              </FilterButton>
            </Stack>
          </Stack>
          {movies.data && movies.data.Search && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Release Date
                    </StyledTableCell>
                    <StyledTableCell align="right">IMDb ID</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movies.data.Search.map((movie) => (
                    <StyledTableRow
                      key={movie.imdbID}
                      style={{ cursor: "pointer" }}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                      onClick={() => navigate(`/movies/${movie.imdbID}`)}
                    >
                      <StyledTableCell component="th" scope="row">
                        {movie.Title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {movie.Year}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {movie.imdbID}
                      </StyledTableCell>
                    </StyledTableRow>
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
                  return (
                    <PaginationItem
                      component={Link}
                      to={route}
                      {...item}
                    />
                  );
                }}
              />
            </Stack>
          )}
        </Box>
      </Container>
    </main>
  );
}

export default Movies;
