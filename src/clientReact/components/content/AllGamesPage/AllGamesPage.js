import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard/ProductCard';

require('./AllGamesPage.scss');

class AllGamesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    // Fetching data for product list
    axios.get('/product')
      .then((res) => {
        // handle success
        // console.log(res.data.data.docs);
        this.setState({products: res.data.products.docs});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={"AllGamesPage"}>
        <div id="games" className="container mt-5 mb-5">
          <h2 className="mt-5 ml-5 mb-5 text-light">Games</h2>
          <div className="card-deck m-5">

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
