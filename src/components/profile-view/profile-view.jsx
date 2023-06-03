import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch(`https://movie-api-xy68.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Userdata not changed");
          return false;
        }
      })
      .then(user => {
        if (user) {
          alert("Userdata changed successfully");
          updateUser(user);
        }
      })
      .catch(e => {
        alert(e);
      });
  }

  const deleteAccount = () => {
    fetch(`https://movie-api-xy68.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          alert("Account has been deleted");
          onLoggedOut();
        } else {
          alert("Account could not be deleted");
        }
      })
      .catch(e => {
        alert(e);
      });
  }

  return (
    <>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title >Data</Card.Title>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthdate: {user.Birthday.slice(0,10)}</p>
          </Card.Body>
        </Card>
        <Button variant="danger" onClick={() => {
          if (confirm("Continue with account deletion?")) {
            deleteAccount();
          }
        }}>Delete Account</Button>
      </Col>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Change Data</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  minLength="5"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength="8"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <h3 className="mt-3 mb-3 text-light">Favorite Movies</h3>
      </Col>
      {favoriteMovies.map(movie => (
        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  );
}