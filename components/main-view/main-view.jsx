import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view"
import { SignupView } from "../signup-view/signup-view"

export const MainView = ({ onLoggedIn }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-xy68.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name
          }
        });

        setMovies(moviesFromApi);
        })
  }, [token])

  if (!user) {
    return (
      <div>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        return <div>The list is empty!</div>;
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>
    );
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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );

};

