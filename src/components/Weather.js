import React from 'react'
import { Card } from 'react-bootstrap'
class Weather extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.weatherdata.map((weather) => {
          return <Card style={{ width: '30rem' }} className="text-center mb-3 bg-primary">
            <Card.Title className="p-3 text-white">Date: {weather.date}</Card.Title>
            <Card.Body>
              {weather.description}
            </Card.Body>
          </Card>
        })}

      </>

    )
  }

}
export default Weather