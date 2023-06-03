import "./movie-view.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export const MovieView = ({ user, token, movies, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movie.id));

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie.id));
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://movie-api-xy68.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
        })
        .then((user) => {
          if (user) {
            alert("Movie added to favorites");
            setIsFavorite(true);
            updateUser(user);
          }
        })
        .catch((e) => {
          alert(e);
        });
  };

  const removeFavorite = () => {
    fetch(
      `https://movie-api-xy68.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Movie deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      <div>
        {isFavorite ? (
          <Button variant="danger" onClick={removeFavorite}>
            Remove movie from favorites
          </Button>
        ) : (
          <Button variant="success" onClick={addFavorite}>
            Add movie to favorites
          </Button>
        )}
      </div>
    </div>
  );
};