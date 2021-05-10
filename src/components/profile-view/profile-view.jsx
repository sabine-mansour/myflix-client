import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./profile-view.scss";

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
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
      email: localStorage.getItem("email"),
      birthday: localStorage.getItem('birthday'),
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
        let favMovies = response.data.FavoriteMovies;
        localStorage.setItem('favoriteMovies', favMovies);
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
    const { movies, onBackClick } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    if (this.state.birthday === 'undefined') {
      this.state.birthday = 'N/A';
    }
    return (
      <div className="profile-view">
        <h2>My Profile</h2>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <h5>Username</h5>
            <Form.Label>{this.state.username}</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <h5>Email</h5>
            <Form.Label>{this.state.email}</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicDate">
            <h5>Date of Birth</h5>
            <Form.Label>{this.state.birthday}</Form.Label>
          </Form.Group>
          <ButtonToolbar>
            <ButtonGroup className="mr-5">
              <Link to={`/update/${this.state.username}`}>
                <Button>Edit Profile</Button>
              </Link>
            </ButtonGroup>
            <ButtonGroup className="mr-3">
              <Button variant="danger" onClick={() => { this.handleDelete() }}>Delete Profile</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form>
        <div className="favorite-list">
          <h5>Favorite Movies</h5>
          <Container>
            <Row>
              {favoriteMovieList.map((movie) => {
                return (
                  <Col md={3} key={movie._id}>
                    <Card className="text-center">
                      <Link to={`/movies/${movie._id}`}><Card.Img variant="top" src={movie.ImagePath} /></Link>
                      <Card.Body>
                        <Button variant="outline-danger" onClick={() => this.removeFavorite(movie)}>
                          Remove
                      </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}

            </Row>
          </Container>
        </div>
      </div>
    )
  }
}