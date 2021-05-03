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
      register: null,
      registered: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://flixinfo.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  toggleRegister(user) {
    this.setState({
      register: !this.state.register
    })
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;


    if (!user) return (
      (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={user => this.toggleRegister(user)} />
          </Col>
        </Row>
      )
    );

    if (!register) return (
      (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={user => this.toggleRegister(user)} />
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