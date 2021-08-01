import React from 'react';
import Weather from './Weather.js'
import Form from 'react-bootstrap/Form'
import ErrorModal from './ErrorModal'
import CityMap from './Movies'
import { Button, Card, Image, Container, Col, Row } from 'react-bootstrap'
import Axios from 'axios'

//Use the space between render and return to make quick vars for use in non changing items
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      lat: "0.750",
      lon: "0.756",
      display_name: "Corneria, Lylat System",
      weather: [],
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
  getLocationData = async () => {
    let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityInput}&format=json`;
    try {

      const res = await Axios.get(URL);
      this.setState({
        lat: res.data[0].lat,
        lon: res.data[0].lon,
        display_name: res.data[0].display_name
      });
      const weather = await Axios.get(`http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}`);
      console.log(weather.data, typeof (weather.data))

      this.setState({ weather: weather.data });

    }
    catch (e) {
      console.log(e)
      // console.log('error!', e.response.status, e.response.data.error);
      // this.setState({ errStatus: e.response.status, errMessage: e.response.data.error, modalVis: true })


    }
  }
  cityFormChange = (e) => {
    e.preventDefault();
    this.setState({ cityInput: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Clicked: ${this.state.cityInput}`);
    this.getLocationData();
  }
  //TODO: Simplify the Image Handling.
  render() {
    let staticImage;
    if (this.state.lat === '0.750') staticImage = 'https://via.placeholder.com/400x400';
    else { staticImage = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}&zoom=15` }
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
          <h3 className="bg-primary text-white-50 bg-gradient text-center">{this.state.lat} {this.state.lon}</h3>
        </Row>
        <Row className="m-3">
          <Col className="p-2">
            <Image className="img-fluid" src={staticImage} alt="image"></Image>
          </Col>
          <Col className="p-2">
            <Weather weatherdata={this.state.weather} cityname={this.state.display_name} />
          </Col>
        </Row>
      </>
    )
  }
}

export default Main;