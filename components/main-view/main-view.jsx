import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Row, Col } from "react-bootstrap";
import "./main-view.scss";

export const MainView = ({ onLoggedIn }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
            image: movie.Image,
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name
          }
        });

        setMovies(moviesFromApi);
        })
  }, [token])

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <>
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} className="logout-button">Logout</Button>
          </Col>
        </>
      ) : movies.length === 0 ? (
        <>
          <div>The list is empty!</div>;
          <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} className="logout-button">Logout</Button>
        </>
      ) : (
        <>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
          <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} className="logout-button">Logout</Button>
        </>
      )}
    </Row>
  );

};

