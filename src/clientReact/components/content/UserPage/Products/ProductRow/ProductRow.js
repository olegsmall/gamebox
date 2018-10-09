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
      <div>
        <Link className="linkArticle" to={`/product/${product._id}`}>
          <div className={'card border-0'}>
              <div className={'ProductRow'}>
                <div className="card-body text-center text-md-left">
                  <img className="img-fluid float-md-left mr-5 imageYourGame" src={product.images[0]} alt={product.title}/>
                  <h5 className="card-title mt-3 mt-md-0">{product.title}</h5>
                  {/*<p className="card-text text-left">{product.description.substring(0, 25)}</p>*/}
                  <p className="card-text">{product.genres.join(' ')}</p>
                  <a className="linkArticle btn my-2 btnAddGame" href={''}>Edit Game</a>
                </div>
              </div>
          </div>
        </Link>
        <hr/>
      </div>
    );
  }

}

export default ProductRow;
