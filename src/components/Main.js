import React from 'react';
import Weather from './Weather.js'
import Movies from './Movies.js'
import Yelp from './Yelp.js'
import Form from 'react-bootstrap/Form'
import ErrorModal from './ErrorModal'
import { Button, Image, Container, Col, Row } from 'react-bootstrap'
import Axios from 'axios'
//Use the space between render and return to make quick vars for use in non changing items
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      coordinates: { lat: '.705', lon: '.743' },
      lat: "0.750",
      lon: "0.756",
      display_name: "Corneria, Lylat System",
      weather: [],
      movies: [],
      yelp: [],
      modalVis: false,
      errStatus: 1,
      errMessage: "All Zeros",
      showData: false
    }
  }
  modalHandler = (e) => {
    if (this.state.modalVis === true) {
      this.setState({ modalVis: false })
    }
    else { this.setState({ modalVis: true }) }
    console.log("Close the modal.  Modal State: " + this.state.modalVis);
  }
  getLocationInfo = async () => {
    let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityInput}&format=json`;
    try {
      //get lat/long city name.  
      const res = await Axios.get(URL);
      //set it's state
      this.setState({
        display_name: res.data[0].display_name,
        coordinates: { lat: res.data[0].lat, lon: res.data[0].lon },
      });
      console.log(`LAT: ${this.state.coordinates.lat} LONG: ${this.state.coordinates.lon}`);
    }
    catch (error) {
      console.log(`Status: ${error.status} Type: Location Message: ${error.message}`)
    }
    await this.getWeather();
    await this.getMovies();
    await this.getYelp();
  }
  async getYelp() {
    try {
      const yelpApi = await Axios.get(`${process.env.REACT_APP_DEPLOYED_URL}/yelp?searchQuery=${this.state.cityInput}`);
      this.setState({ yelp: yelpApi.data });
    }
    catch (err) {
      console.log('Yelp Error: ' + err);
    }
  }
  async getMovies() {
    try {
      //get movies from server
      const movieApi = await Axios.get(`${process.env.REACT_APP_DEPLOYED_URL}/movies?city_name=${this.state.cityInput}`);
      this.setState({ movies: movieApi.data });
    }
    catch (error) {
      console.log(`Status: ${error.status} Type: Movie Message: ${error.message}`)
    }
  }
  async getWeather() {
    try {
      //get weather from server

      const weather = await Axios.get(`${process.env.REACT_APP_DEPLOYED_URL}/weather?lat=${this.state.coordinates.lat}&lon=${this.state.coordinates.lon}`);
      this.setState({ weather: weather.data });
    }
    catch (error) {
      console.log(`Status: ${error.status} Type: Weather Message: ${error.message}`)
    }
  }
  cityFormChange = (e) => {
    e.preventDefault();
    this.setState({ cityInput: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Clicked: ${this.state.cityInput}`);
    this.getLocationInfo();
  }
  //TODO: Simplify the Image Handling.
  render() {
    let staticImage;
    if (this.state.coordinates.lat === '0.750') staticImage = 'https://via.placeholder.com/400x400';
    else { staticImage = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.coordinates.lat},${this.state.coordinates.lon}&zoom=15` }
    console.log(this.state)
    return (
      <>
        <ErrorModal modalVis={this.state.modalVis} modalHandler={this.modalHandler} errStatus={this.state.errStatus} errMessage={this.state.errMessage} />
        <Row>
          <Col>
            <h1 className="display-1">City Explorer-O-Matic</h1>
          </Col>
        </Row>
        <Row>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control onChange={this.cityFormChange} type="text" custom>
                </Form.Control>
                <Button className="m-3" onClick={this.handleSubmit}>Explore!</Button>
              </Form.Group>
            </Form>
          </Container>
        </Row>
        <Row className="bg-primary bg-gradient">
          <h2 className="bg-primary text-white bg-gradient text-center">{this.state.display_name}</h2>
          <h3 className="bg-primary text-white-50 bg-gradient text-center">{this.state.coordinates.lat} {this.state.coordinates.lon}</h3>
        </Row>
        <Row className="m-3">
          <Col className="p-2">
            <h2 className="text-center bg-primary text-white">Location Map</h2>
            <Image className="img-fluid" src={staticImage} alt="image"></Image>
          </Col>
          <Col className="p-2">
            <h2 className="text-center bg-primary text-white">Forecast</h2>
            {(this.state.weather.length > 0) ?
              <Weather weatherData={this.state.weather} /> : <h1>No Weather Data To Display</h1>
            }
          </Col>
        </Row>
        <Row className="m-3">
          <Col>
            <h2 className="text-center bg-primary text-white">Movies</h2>
            <Container fluid="true">
              <Movies movieList={this.state.movies} />
            </Container>
          </Col>
          <Col>
            <h2 className="text-center bg-primary text-white">Local Businesses (Yelp)</h2>
            <Container fluid="true">
              {(this.state.yelp.length > 0) ? <Yelp yelpData={this.state.yelp} /> : <h1>No Business Data to Display</h1>}

            </Container>
          </Col>
        </Row>
      </>
    )
  }
}

export default Main;