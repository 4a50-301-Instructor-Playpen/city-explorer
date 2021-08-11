import React from 'react'
class YelpBusiness extends React.Component {
  render() {

    return (
      <>
        <h1>{this.props.business.name}</h1>
      </>
    )
  }
}
export default YelpBusiness