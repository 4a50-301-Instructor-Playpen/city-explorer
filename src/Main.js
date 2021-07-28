import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Axios from 'axios'


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      locationData: { lat: "0", lon: "0", display_name: "Unk City" }
    }
  }
  getLocationData = async () => {
    let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityInput}&format=json`;

    const res = await Axios.get(URL);
    this.setState({ locationData: res.data[0] });
  }
  cityFormChange = (e) => {
    this.setState({ cityInput: e.target.value });
  }
  handleSubmit = (e) => {
    console.log(`Clicked: ${this.state.cityInput}`);
    this.getLocationData();

  }
  render() {
    return (
      <>
        <h1>Main</h1>
        <Form className="m4">
          <Form.Group>
            <Form.Control onChange={this.cityFormChange} type="text" custom>
            </Form.Control>
            <br />
            <Button onClick={this.handleSubmit}>Explore!</Button>
          </Form.Group>
        </Form>
        <br />
        <Card style={{ width: '18rem' }} className="text-center">
          <Card.Title>{this.state.locationData.display_name}</Card.Title>
          <Card.Subtitle>
            Latitiude: {this.state.locationData.lat}  Longitude: {this.state.locationData.lon}
          </Card.Subtitle>

        </Card>
        <h2>cityInput: {this.state.cityInput}</h2>
        <p>Lat: {this.state.locationData.lat} Lon: {this.state.locationData.lon}</p>
      </>
    )
  }
}
export default Main;