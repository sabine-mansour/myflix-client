import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import "./genre-view.scss";


export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;
    return (
      <div className="genre-view">
        <h2>{genre.Name}</h2>
        <div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>
        <div className="genre-movies">
          <h6>{genre.Name} Movies </h6>
          <Container>
            <Row>
              {movies.map((m) => {
                if (m.Genre.Name === genre.Name) {
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