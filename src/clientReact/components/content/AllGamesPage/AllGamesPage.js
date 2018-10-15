/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: AllGamesPage.js, all games page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard/ProductCard';

require('./AllGamesPage.scss');

/**
 * Class AllGamesPage, all games page component
 */
class AllGamesPage extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {
    // Fetching data for product list
    axios.get('/product')
      .then((res) => {
        // handle success
        this.setState({products: res.data.products.docs});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Add to DOM
  render() {
    return (
      <div className={"AllGamesPage"}>
        <div className="imageMain">
          <img className="d-block w-100" src="image/back5.jpg" alt="Main image"/>
        </div>
        <div id="games" className="container mb-5">
          <h2 className="mb-4 mt-4 text-center">Games</h2>
          <div className="row">

            {this.state.products.map((product, index) => (
              <ProductCard key={product._id} product={product}/>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

export default AllGamesPage;
