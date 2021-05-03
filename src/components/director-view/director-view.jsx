import React from 'react';
import Button from 'react-bootstrap/Button';


export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Birth: </span>
          <span className="value">{director.Director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="label">Death: </span>
          <span className="value">{director.Director.Death}</span>
        </div>
        <Button variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
      </div>
    );
  }
}