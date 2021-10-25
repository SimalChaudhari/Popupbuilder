import React, {Component} from 'react';
import VariantSelector from './VariantSelector';
import { Button,Modal} from 'react-bootstrap';
// constants
const ONE_SIZE_FITS_MOST = "One Size Fits Most";

class Product extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let aOptionNames = [];
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      aOptionNames.push(option.name);
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    let bShowOneSizeFitsMost = (variantSelectors.length === 1 && aOptionNames[0] === "Title");
    return (
      <>
      <div className="col-md-4">
        <div className="card course-card template-card p-0 shadow-xss border-0  overflow-hidden mr-1 mb-4">
          <div className="card-image w-100 mb-3">
          <a
              href="#"
              className="video-bttn position-relative d-block"
            >
              {this.props.product.images.length ?
                <img
                  data-src={variantImage.src}
                  alt="image"
                  className="w-100 lazy entered loaded"
                  src={variantImage.src}
                  height="332"
                  data-ll-status="loaded"
                  alt={`${this.props.product.title} product shot`}
                />
              : null}
            </a>
          </div>

          <div className="card-body pt-0">
            <h5 className="Product__title">{this.props.product.title}</h5>
            <p>${variant.price}</p>
            {bShowOneSizeFitsMost ? <h5 className="Product__title">{ONE_SIZE_FITS_MOST}</h5> : variantSelectors}
            <label className="Product__option">
              Quantity: <input className="form-control" min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
            </label>
            <button className="btn btn-primary" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
          </div>
          
        </div>
      </div>
      </>
    );
  }
}

export default Product;
