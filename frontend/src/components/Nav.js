import React from 'react'
import '../styles/Nav.css'

class Nav extends React.Component {
  render () {
    return(
      <div className="row col-md-12 nav">
        <ul>
         <li className="btn btn-primary"><span onClick={this.props.handleCartOpen}>Shopify Cart</span></li>
        </ul>
      </div>
    )
  }
}

export default Nav;