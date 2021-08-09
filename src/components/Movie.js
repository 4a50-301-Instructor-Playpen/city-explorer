import React from 'react';
import { Card } from 'react-bootstrap'

class Movie extends React.Component {

  render() {
    return (
      <Card key={this.props.movie.title} className="text-center m-1 bg-secondary" style={{ width: '18rem', }}>
        <Card.Img variant="top" src={this.props.movie.image_url} fluid />
        <Card.Title>{this.props.movie.title}</Card.Title>
        <Card.Subtitle>{this.props.movie.released_on}</Card.Subtitle>
        <Card.Text>{this.props.movie.image_url}</Card.Text>
        <Card.Body>
          <p className="text-white">{this.props.movie.overview}</p>
        </Card.Body>
      </Card>
    )
  }
}

export default Movie
