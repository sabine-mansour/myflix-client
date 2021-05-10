import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;
    return (
      <div className="director-view">
        <h2>{director.Name}</h2>
        <div className="director-bio">
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="date">Birth: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="date">Death: </span>
          <span className="value">{director.Death}</span>
        </div>
        <div className="director-movies">
          <h6>Movies directed by {director.Name} </h6>
          <Container>
            <Row>
              {movies.map((m) => {
                if (m.Director.Name === director.Name) {
                  return (
                    <Col md={3} key={m._id}>
                      <Card>
                        <Card.Img variant="top" src={m.ImagePath} />
                        <Card.Body>
                          <Card.Title>{m.Title}</Card.Title>
                          <Link to={`/movies/${m._id}`}>
                            <Button variant="outline-primary">Learn More</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                }
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}