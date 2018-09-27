import React from 'react';
import axios from "axios";

require('./ProductRow.scss');

class ProductRow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const product = this.props.product;
    return (
      <div className={'card d-flex flex-row flex-nowrap'}>
        <div><img src={'/image' + product.image[0]} alt={product.title}/></div>
        <div>{product.title}</div>
        <div><a href="">Edit Game</a></div>
      </div>
    );
  }

}

export default ProductRow;