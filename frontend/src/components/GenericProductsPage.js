import React from 'react'
import Products from './shopify/Products';
import { connect } from 'react-redux'
import store from '../store';

class GenericProductsPage extends React.Component {
  constructor() {
    super();
    this.addVariantToCart = this.addVariantToCart.bind(this);
  }
  addVariantToCart(variantId, quantity) {
    const state = store.getState(); // state from redux store
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: {isCartOpen: true, checkout: res}});
    });
  }
  render () {
    const state = store.getState(); // state from redux store
    let oProducts = <Products
      products={state.products}
      client={state.client}
      addVariantToCart={this.addVariantToCart}
    />;
    return(
      <div>
        {oProducts}
      </div>
    )
  }
}

export default connect((state) => state)(GenericProductsPage);