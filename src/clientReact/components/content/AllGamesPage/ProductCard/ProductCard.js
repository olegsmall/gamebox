import React from 'react';
import {Link} from 'react-router-dom';

require('./ProductCard.scss');

class ProductCard extends React.Component {


  render() {
    const product = this.props.product;

    const genres = product.genres.map(genre => genre.name + ' ');

    return (
        <div className="ProductCard col-sm-6 col-lg-4 col-xl-3 mb-4 cardDiv">
        <Link className="aBlack" to={'/product/' + product._id}>
          <div className="card imgBody cardAllGame">
            <div className="img-fluid">
              <div className="imageStar">
                <div className="paragraphV text-light pl-2">4,5</div>
              </div>
              <img className="card-img-top imgBorder" src="/image/img1.jpg"/>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">{product.title}</h5>
              <div className="text-center">Genre : {genres}</div>
              <div className="text-center mt-1">
                <div>Rent<span className="btnPrice ml-2 pl-1 pr-1">  {}$/day</span></div>
                <div>Buy<span className="btnPrice ml-2 pl-1 pr-1">  {}$</span></div>
              </div>
            </div>
          </div>
        </Link>
      </div>
     );
  }
}

export default ProductCard;
