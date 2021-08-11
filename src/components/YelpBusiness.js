import React from 'react'
import Card from 'react-bootstrap/Card'
class YelpBusiness extends React.Component {
  handleClick = () => {
    console.log('clickyClick');
    window.open(this.props.business.url, "_blank")

  }

  render() {

    return (
      <>
        <Card onClick={this.handleClick} key={this.props.business.name} className="text-center mb-1 bg-secondary">
          <Card.Img variant="top" src={this.props.business.image_url} fluid="true" />
          <Card.Title>
            <h2 className="fw-bold text-white"> {this.props.business.name}</h2>
          </Card.Title>
          <Card.Body>
            <h3 className="text-white">Price: {this.props.business.price}</h3>
            <h3 className="text-white">Rating: {this.props.business.rating}</h3>
          </Card.Body>
        </Card>
      </>
    )
  }
}
export default YelpBusiness