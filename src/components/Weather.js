import React from 'react'
import { Card } from 'react-bootstrap'
class Weather extends React.Component {
  render() {
    let weatherArr = [];
    if (this.props.weatherdata.length > 4) {
      for (let i = 0; i < 4; i++) {
        weatherArr.push(this.props.weatherdata[i]);
      }
    }
    else {
      this.props.weatherdata.map((w) => {
        return weatherArr.push(w);
      });
    }
    return (
      <>
        {weatherArr.map((w) => {
          return <Card key={w.date} className="text-center mb-1 bg-secondary">
            <Card.Title>
              <h2 className="fw-bold text-white">Date: {w.date}</h2>
            </Card.Title>
            <Card.Body>
              <h3 className="text-white">{w.description}</h3>
            </Card.Body>
          </Card>
        })}
      </>
    )
  }
}
export default Weather