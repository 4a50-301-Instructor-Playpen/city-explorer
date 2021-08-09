import React from 'react';
import Movie from './Movie.js'
// import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
class Movies extends React.Component {

  render() {
    if (!this.props.movie.overview) this.props.movie.overview = "No Overview Provided";
    if (this.props.movie.image_url === 'https://image.tmdb.org/t/p/w200null') this.props.movie.image_url = 'https://via.placeholder.com/200'

    // MOVE ERROR CHECKING TO SERVER!!!!

    return (
      <Row xs={1} md={2}>
        {this.props.movieList.map(
          m => {
            return <Movie key={m.title} movie={m} />
          })}
      </Row>
    )


  }
}

export default Movies;