import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Psycho', Description: 'Marion disappears after stealing money from her employer. Her lover and sister try to find her and end up reaching the infamous Bates Motel, where they meet Norman Bates.', ImagePath: 'https://resizing.flixster.com/v_K71ZmJSwUOq07BPt5lkvDv8hE=/206x305/v2/https://flxt.tmsimg.com/assets/p283_p_v13_an.jpg' },
        { _id: 1, Title: 'This is 40', Description: "Pete and Debbie are both about to turn 40, their kids hate each other, both of their businesses are failing, they're on the verge of losing their house, and their relationship is threatening to fall apart.", ImagePath: 'https://resizing.flixster.com/pXfXz0gkQPCVEhuA-aAK78QdKMM=/206x305/v2/https://flxt.tmsimg.com/assets/p9286982_p_v10_aa.jpg' },
        { _id: 1, Title: 'Predator', Description: 'Dutch and his team are out on a mission to rescue a group of hostages in Central America. There, they discover that they are being targeted by an extraterrestrial warrior.', ImagePath: 'https://resizing.flixster.com/Zk1DHum0Aru8gNYGFIqwgnjQlFg=/206x305/v2/https://flxt.tmsimg.com/assets/p10094_p_v13_ah.jpg' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">This list is empty!</div>;


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