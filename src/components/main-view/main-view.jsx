import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import "./main-view.scss";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios.get('https://flixinfo.herokuapp.com/movies').then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return (
      (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <RegistrationView onRegister={register => this.onRegister(register)} />
          </Col>
        </Row>
      )
    );

    if (!user) return (
      (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
        </Row>
      )
    );

    if (movies.length === 0) return <Row className="main-view" />;


    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}