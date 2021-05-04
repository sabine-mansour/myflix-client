import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favoriteMovies: [],
      movies: ""
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({
      username: localStorage.getItem("user"),
      password: localStorage.getItem("password"),
      email: localStorage.getItem("email"),
      birthday: localStorage.getItem("birthday"),
      favoriteMovies: localStorage.getItem("favoriteMovies"),
    });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://flixinfo.herokuapp.com/users/" +
      localStorage.getItem("user") + "/favourites/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(
        `https://flixinfo.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + " has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <h6>Username: </h6>
            <Form.Label>{this.state.username}</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <h6>Email:</h6>
            <Form.Label>{this.state.email}</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicDate">
            <h6>Date of Birth:</h6>
            <Form.Label>{this.state.birthday}</Form.Label>
          </Form.Group>
          <Link to={`/update/${this.state.username}`}>
            <Button>Edit Profile</Button>
          </Link>
        </Form>
        <div>
          <h5>Favorite Movies:</h5>
          {favoriteMovieList.map((movie) => {
            return (
              <div key={movie._id}>
                <Card>
                  <Card.Img variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Link>
                  </Card.Body>
                </Card>
                <Button onClick={() => this.removeFavorite(movie)}>
                  Remove
                      </Button>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}