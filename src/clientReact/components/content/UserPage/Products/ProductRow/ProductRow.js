import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

require('./ProductRow.scss');

class ProductRow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    const {product} = this.props;
    return (
      <div className={'ProductRow col-md-6'}>
            <Link className="linkArticle" to={`/product/${product._id}`}>
              <div className={'card cardProduct'}>
                <img className="card-img-top imgProduct" src={product.images[0]} alt={product.title}/>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description.substring(0, 25)}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{product.genres.join(' ')}</li>
                  <li className="list-group-item">Selling price: {product.price.sell}$</li>
                  <li className="list-group-item">Rent price: {product.price.rent}$</li>
                </ul>
              </div>
            </Link>
            <a className="linkArticle btn w-50 my-3 btnAddGame" href={''}>Edit Game</a>
      </div>
    );
  }

}

export default ProductRow;
