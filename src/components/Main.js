import React from 'react';
import Form from 'react-bootstrap/Form'
import ErrorModal from './ErrorModal'
import { Button, Card, Image, Container, ThemeProvider } from 'react-bootstrap'
import Axios from 'axios'


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      lat: "0.750",
      lon: "0.756",
      display_name: "Corneria, Lylat System",
      staticImage: "https://via.placeholder.com/400x400",
      modalVis: false,
      errStatus: 1,
      errMessage: "All Zeros"
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
    let loqKey = process.env.REACT_APP_CITY_KEY;
    let URL = `https://us1.locationiq.com/v1/search.php?key=${loqKey}&q=${this.state.cityInput}&format=json`;
    try {

      const res = await Axios.get(URL);
      this.setState({
        lat: res.data[0].lat,
        lon: res.data[0].lon,
        display_name: res.data[0].display_name
      });
      let imageURL = `https://maps.locationiq.com/v3/staticmap?key=${loqKey}&center=${this.state.lat},${this.state.lon}&zoom=15`
      this.setState({ staticImage: imageURL });
    }
    catch (e) {
      console.log('error!', e.response.status, e.response.data.error);
      this.setState({ errStatus: e.response.status, errMessage: e.response.data.error, modalVis: true })


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
  render() {
    return (
      <>
        <ErrorModal modalVis={this.state.modalVis} modalHandler={this.modalHandler} errStatus={this.state.errStatus} errMessage={this.state.errMessage} />

        <h1>City Explorer!</h1>
        <Container className="mb-3">
          <Form className="m4" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control onChange={this.cityFormChange} type="text" custom>
              </Form.Control>
              <br />
              <Button onClick={this.handleSubmit}>Explore!</Button>
            </Form.Group>
          </Form>
        </Container>
        <Container>
          <Card style={{ width: '30rem' }} className="text-center mb-3 bg-primary">
            <Card.Title className="p-3 text-white">{this.state.display_name}</Card.Title>
            <Card.Subtitle className="text-white bg-secondary">
              Latitiude: {this.state.lat}  Longitude: {this.state.lon}
            </Card.Subtitle>
            <Image src={this.state.staticImage} alt="image"></Image>
          </Card>
        </Container>

      </>
    )
  }
}

export default Main;