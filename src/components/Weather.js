import React from 'react'
import WeatherDay from './WeatherDay.js'
class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.weatherData.map(w =>
          <WeatherDay key={w.forecast} weather={w} />
        )}
      </>
    )
  }
}
export default Weather