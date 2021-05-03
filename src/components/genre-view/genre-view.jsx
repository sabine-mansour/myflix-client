import React from 'react';
import Button from 'react-bootstrap/Button';


export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Genre.Description}</span>
        </div>
        <Button variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
      </div>
    );
  }
}