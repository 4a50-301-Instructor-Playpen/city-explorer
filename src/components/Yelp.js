import React from 'react'
import YelpBusiness from './YelpBusiness'

class Yelp extends React.Component {
  render() {
    console.log('yelpData:' + this.props.yelpData);
    return (
      <>
        {this.props.yelpData.map(y => <YelpBusiness key={y.name} business={y} />)}
      </>
    )
  }
}
export default Yelp