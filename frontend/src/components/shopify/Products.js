import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  render() {
    let products;
    if (this.props.products) {
      products = this.props.products.map((product) => {
        return (
          <Product
            addVariantToCart={this.props.addVariantToCart}
            client={this.props.client}
            key={product.id.toString()}
            product={product}
          />
        );
      });
    } else {
      products = <p>Loading...</p>;
    }
    products.reverse(); // CHFE 2018.10.15 - this makes it so the products are shown newest to oldest on first load
    return (
      <div className="Product-wrapper">
        {/* {products} */}
        <div className="row">
          <div className="col-md-12 col-xl-12 col-sm-12 col-xs-12">
            <div className="row">
              {products}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
