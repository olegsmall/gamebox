/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ProductRow.js, Product's row, the part of Products component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */


import React from 'react';
import {Link} from "react-router-dom";

require('./ProductRow.scss');

/**
 * Class ProductRow, Product's row component, the part of Products component
 */
class ProductRow extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
  }

  /**
   * Edit game
   * @param e
   */
  handleEdit(e){
    e.preventDefault();
    this.props.setUserPageState({
      productForEdit: this.props.product,
    });
    this.props.changeInner('EditProduct');
  };

  componentDidMount() {

  }

  //Add to DOM
  render() {

    const {product} = this.props;
    return (
      <div>
        <Link className="linkArticle" to={`/product/${product._id}`}>
          <div className={'card border-0'}>
            <div className={'ProductRow'}>
              <div className="card-body text-center text-md-left">
                <img className="img-fluid float-md-left mr-5 imageYourGame" src={product.images[0]}
                     alt={product.title}/>
                <h5 className="card-title mt-3 mt-md-0">{product.title}</h5>
                {/*<p className="card-text text-left">{product.description.substring(0, 25)}</p>*/}
                <p className="card-text">{product.genres.join(' ')}</p>
                <button className="linkArticle btn my-2 btnAddGame" onClick={this.handleEdit.bind(this)}>Edit Game</button>
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
