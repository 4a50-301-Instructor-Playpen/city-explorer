import React from 'react'
import WeatherDay from './WeatherDay.js'
import { Card } from 'react-bootstrap'
class Weather extends React.Component {
  constructor(props) {
    super(props)
  }
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
          return <WeatherDay key={w.date} weather={w} />
        })}
      </>
    )
  }
}
export default Weather