import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';

import "./main-view.scss";

class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies)
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://flixinfo.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.props.setMovies(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  logOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
    console.log("logout successful");
    window.open("/", "_self");
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">FlixInfo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Button className="mr-sm-2" variant="secondary" onClick={() => this.logOut()}>Sign Out</Button>
            </Navbar.Collapse>


          </Navbar>
          <Row className="main-view justify-content-md-center">

            <Route exact path='/' render={() => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />

              return <MoviesList movies={movies} />
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col md={6}>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />

              return <Col md={7}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
              </Col>

            }} />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} movies={movies} />
              </Col>
            }} />

            <Route path="/users/:userId" render={({ history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={10}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/update/:userId" render={({ history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <ProfileUpdate movies={movies} onBackClick={() => history.goBack()} /></Col>

            }} />

          </Row>
        </Router>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);