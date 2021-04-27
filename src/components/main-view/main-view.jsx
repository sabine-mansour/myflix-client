import React from 'react';
import axios from 'axios';

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
    const { movies, selectedMovie } = this.state;

    if (!this.state.user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!this.state.register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    if (movies.length === 0) return <div className="main-view" />;


    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}