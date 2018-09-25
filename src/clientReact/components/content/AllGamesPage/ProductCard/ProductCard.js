import React from 'react';
import {Link} from 'react-router-dom';

require('./ProductCard.scss');

class ProductCard extends React.Component {


  render() {
    const product = this.props.product;

    const genres = product.genres.map(genre => genre.name + ' ');

    return (
      <div className="card">
        <img className="card-img-top" src={'image/' + product.images[0]} alt={product.title}/>
        <div className="card-body">
          <h5 className="card-title text-center">
            <Link to={'/product/' + product._id}>
              {product.title}
            </Link>
          </h5>
          <p className="text-center">Genre : {genres}</p>
          <p className="text-center">Rent/Buy : {}$/{}$</p>
          <div className="text-center">
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
          </div>
          <div className="text-center mt-2">
            <button type="button" className="btn btn-success">rent</button>
            <button type="button" className="btn btn-success mr-2">buy</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;