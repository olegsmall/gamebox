/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Products.js, All user products component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import ProductRow from "./ProductRow/ProductRow";
import AddProduct from "../AddProduct/AddProduct";

require('./Products.scss');

/**
 * Class Products, All user products component
 */
class Products extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {

    axios.get('/user/' + this.props.user._id + '/products')
      .then((res) => {
        // handle success
        this.setState({products: res.data.products.docs});
      })
      .catch((error) => {
        console.error(error.response);
      });

  }

  /**
   * Add game
   * @param e
   */
  handleAddProduct(e) {
    e.preventDefault();
    this.props.changeInner('AddProduct');
  }

  render() {

    return (
      <div className={'Products col-md-8 text-center'}>
        <h2 className="text-center mt-4">Your games</h2>
        <button className={'btn btn-block mt-2 btnAddGame'} onClick={this.handleAddProduct.bind(this)}>Add game
        </button>
        <div id="yourGame" className="container mt-3">

                {this.state.products.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    setUserPageState={this.props.setUserPageState}
                    changeInner={this.props.changeInner}
                  />
                  ))}

        </div>
      </div>
    );
  }

}

export default Products;
