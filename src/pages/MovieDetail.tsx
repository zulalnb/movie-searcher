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
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchMovieDetail } from "../features/moviesSlice";

function MovieDetail() {
  const { imdbId } = useParams<{ imdbId?: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.movieDetail);

  useEffect(() => {
    if (imdbId) {
      dispatch(fetchMovieDetail(imdbId));
    }
  }, [imdbId]);

  return (
    <Container>
      {!!movie.data && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" fontWeight="bold">
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
                <Box>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    Storyline
                  </Typography>
                  <Typography variant="body1">
                    {movie.data.Plot}
                  </Typography>
                </Box>
                <Stack direction="row" justifyContent="space-between" mt={4}>
                  <Table
                    aria-label="simple table"
                    size="small"
                    sx={{ width: "70%", "td, th": { border: 0 } }}
                  >
                    <TableRow>
                      <TableCell variant="head" width="30%">
                        IMDb rating
                      </TableCell>
                      <TableCell>{movie.data.imdbRating}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" width="30%">
                        Release Date
                      </TableCell>
                      <TableCell>{movie.data.Released}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" width="30%">
                        Genre(s)
                      </TableCell>
                      <TableCell>{movie.data.Genre}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" width="30%">
                        Countries
                      </TableCell>
                      <TableCell>{movie.data.Country}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" width="20%">
                        Duration
                      </TableCell>
                      <TableCell>{movie.data.Runtime}</TableCell>
                    </TableRow>
                  </Table>
                  <Box>
                    <Typography variant="h6" component="h2" fontWeight="bold">
                      Director
                    </Typography>
                    <Typography variant="body1">
                      {movie.data.Director}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
            <Box mt={5} >
              <Typography variant="h5" component="h2" fontWeight="bold">
                Cast
              </Typography>
              <Typography variant="body1">
                {movie.data.Actors}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default MovieDetail;
