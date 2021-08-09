import React from 'react';
import Movie from './Movie.js'
// import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
class Movies extends React.Component {

  render() {
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