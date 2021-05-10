import React from 'react';
import Proptypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  addToFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://flixinfo.herokuapp.com/users/" +
      localStorage.getItem("user") + "/favourites/" +
      movie._id;
    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        let favMovies = response.data.FavoriteMovies;
        localStorage.setItem('favoriteMovies', favMovies);
        alert("Movie added to favorites!")
      });
  }
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-image">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director">
          <h6>Director</h6>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>
        <div className="movie-genre">
          <h6>Genre</h6>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>
        <ButtonToolbar className="justify-content-between">
          <Button variant="outline-danger" onClick={() => this.addToFavorite(movie)}>Add to Favorite</Button>
          <Button variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

MovieView.Proptypes = {
  movie: Proptypes.shape({
    Title: Proptypes.string.isRequired,
    Description: Proptypes.string.isRequired,
    ImagePath: Proptypes.string.isRequired
  }).isRequired,
  onBackClick: Proptypes.func.isRequired
};