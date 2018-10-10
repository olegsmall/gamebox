import React from 'react';
import {Link} from 'react-router-dom';

require('./ProductCard.scss');

class ProductCard extends React.Component {


  render() {
    const product = this.props.product;

    const genres = product.genres.map(genre => genre.name).join(', ');

    return (
      <div className="ProductCard col-sm-6 col-lg-4 col-xl-3 mb-4 cardDiv">
        <Link className="aBlack" to={'/product/' + product._id}>
          <div className="card imgBody cardAllGame">
            <div className="img-fluid">
              {product.average_rating > 0
                ? <div className="imageStar">
                    <div className="paragraphV text-light pl-2">4,5</div>
                  </div>
                : ''
              }
              <img className="card-img-top imgBorder" src="/image/img1.jpg"/>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">{product.title}</h5>
              <div className="text-center mt-1">
                {product.price.rent
                  ? <div>Rent: <span className="btnPrice ml-2 pl-1 pr-1">{product.price.rent}$/day</span></div>
                  : ''
                }
                {product.price.sell
                  ? <div>Buy: <span className="btnPrice ml-2 pl-1 pr-1">{product.price.sell}$</span></div>
                  : ''
                }
              </div>
              <div className="text-center">Genre : {genres}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
