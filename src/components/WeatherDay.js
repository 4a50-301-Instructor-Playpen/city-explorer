import React from 'react'
import { Card } from 'react-bootstrap'
class WeatherDay extends React.Component {
  render() {
    return (
      <Card key={this.props.weather.date} className="text-center mb-1 bg-secondary">
        <Card.Title>
          <h2 className="fw-bold text-white">Date: {this.props.weather.date}</h2>
        </Card.Title>
        <Card.Body>
          <h3 className="text-white">{this.props.weather.forecast}</h3>
        </Card.Body>
      </Card>
    )
  }
}
export default WeatherDay


