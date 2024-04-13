import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchMovieDetail } from "../features/moviesSlice";
import Navbar from "../components/Navbar";

function MovieDetail() {
  const { imdbId } = useParams<{ imdbId?: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.movieDetail);

  useEffect(() => {
    if (imdbId) {
      dispatch(fetchMovieDetail(imdbId));
    }
  }, [imdbId]);

  const StyledTableCell = styled(TableCell)({
    color: "#FFFFFF",
    [`&.${tableCellClasses.head}`]: {
      color: "#FFFFFF",
    },
    [`&.${tableCellClasses.body}`]: {
      color: "#FFFFFF",
    },
  });

  return (
    <Container>
      <Navbar />
      {!!movie.data && (
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            color="#FFFFFF"
          >
            {movie.data.Title}
          </Typography>
          <Box mt={4}>
            <Stack direction="row" spacing={5}>
              <img
                src={movie.data.Poster}
                alt={movie.data.Title}
                width={"40%"}
                style={{ objectFit: "contain" }}
              />
              <Box>
                {movie.data.Plot !== "N/A" && (
                  <Box px={2}>
                    <Typography
                      variant="h5"
                      component="h2"
                      fontWeight="bold"
                      color="#FFFFFF"
                    >
                      Storyline
                    </Typography>
                    <Typography variant="body1" color="#FFFFFF">
                      {movie.data.Plot}
                    </Typography>
                  </Box>
                )}
                <Stack direction="row" justifyContent="space-between" mt={4}>
                  <Table
                    aria-label="simple table"
                    size="small"
                    sx={{ width: "70%", "td, th": { border: 0 } }}
                  >
                    <TableRow>
                      <StyledTableCell variant="head" width="30%">
                        IMDb rating
                      </StyledTableCell>
                      <StyledTableCell>
                        {movie.data.imdbRating !== "N/A"
                          ? movie.data.imdbRating
                          : "-"}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell variant="head" width="30%">
                        Release Date
                      </StyledTableCell>
                      <StyledTableCell>
                        {movie.data.Released !== "N/A"
                          ? movie.data.Released
                          : "-"}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell variant="head" width="30%">
                        Genre(s)
                      </StyledTableCell>
                      <StyledTableCell>
                        {movie.data.Genre !== "N/A" ? movie.data.Genre : "-"}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell variant="head" width="30%">
                        Countries
                      </StyledTableCell>
                      <StyledTableCell>
                        {movie.data.Country !== "N/A"
                          ? movie.data.Country
                          : "-"}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell variant="head" width="30%">
                        Duration
                      </StyledTableCell>
                      <StyledTableCell>
                        {movie.data.Runtime !== "N/A"
                          ? movie.data.Runtime
                          : "-"}
                      </StyledTableCell>
                    </TableRow>
                  </Table>
                  {movie.data.Director !== "N/A" && (
                    <Box>
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight="bold"
                        color="#FFFFFF"
                      >
                        Director
                      </Typography>
                      <Typography variant="body1" color="#FFFFFF">
                        {movie.data.Director}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Stack>
            {movie.data.Actors !== "N/A" && (
              <Box mt={5}>
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  color="#FFFFFF"
                >
                  Cast
                </Typography>
                <Typography variant="body1" color="#FFFFFF">
                  {movie.data.Actors}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default MovieDetail;
