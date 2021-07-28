import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Axios from 'axios'
import Image from 'react-bootstrap/Image';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      lat: "0.750",
      lon: "0.756",
      display_name: "Corneria, Lylat System",
      staticImage: "https://via.placeholder.com/400x400"
    }
  }

  getLocationData = async () => {
    let loqKey = process.env.REACT_APP_CITY_KEY;
    let URL = `https://us1.locationiq.com/v1/search.php?key=${loqKey}&q=${this.state.cityInput}&format=json`;
    const res = await Axios.get(URL);
    this.setState({
      lat: res.data[0].lat,
      lon: res.data[0].lon,
      display_name: res.data[0].display_name
    });
    let imageURL = `https://maps.locationiq.com/v3/staticmap?key=${loqKey}&center=${this.state.lat},${this.state.lon}&zoom=15`
    this.setState({ staticImage: imageURL });
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
        <Card style={{ width: '50rem' }} className="text-center">
          <Card.Title>{this.state.display_name}</Card.Title>
          <Card.Subtitle>
            Latitiude: {this.state.lat}  Longitude: {this.state.lon}
          </Card.Subtitle>
          <Image src={this.state.staticImage} alt="image"></Image>
        </Card>
      </>
    )
  }
}

export default Main;