import React from 'react';
import Proptypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-image">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/{$movie.Director.Name}`}>
          <Button variant="link">{movie.Director.Name}</Button>
        </Link>
        <Link to={`/genres/{$movie.Genre.Name}`}>
          <Button variant="link">{movie.Genre.Name}</Button>
        </Link>
        <Button variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
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