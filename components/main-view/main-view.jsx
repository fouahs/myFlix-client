import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Last Samurai",
      director: "Edward Zwick",
      genre: "Historical"
    },
    {
      id: 2,
      title: "Interstellar",
      director: "Chrisopher Nolan",
      genre: "Science Fiction"
    },
    {
      id: 3,
      title: "Spirited Away",
      director: "Hayao Miyazaki",
      genre: "Anime"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
      <div>
        {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
            />
        ))}
      </div>
  );

};

