import React from 'react';
import {Link} from 'react-router-dom';

require('./ProductCard.scss');

class ProductCard extends React.Component {


  render() {
    const product = this.props.product;

    const genres = product.genres.map(genre => genre.name + ' ');

    return (
      <div className="ProductCard">
        <Link className="aBlack" to={'/product/' + product._id}>
          <div className="card h-100 imgBorder cardAllGame">
            <div className="img-fluid">
              <div className="imageStar">
                <div className="paragraphV text-light pl-2">4,5</div>
              </div>
              <img className="card-img-top" src={'image/' + product.images[0]} alt={product.title}/>
            </div>

            <div className="card-body imgBody">
              <h5 className="card-title text-center">{product.title}</h5>
              <div className="text-center">Genre : {genres}</div>
              <p className="text-center">Rent/Buy : {}$/{}$</p>
              <div className="text-center mt-1">
                <div>Rent<span className="btnPrice ml-2 pl-1 pr-1">  10$/day</span></div>
                <div>Buy<span className="btnPrice ml-2 pl-1 pr-1">  55$</span></div>
                <button className="btn-block mt-2"><a href="#" className="pr-3 pl-3">add to cart</a>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
