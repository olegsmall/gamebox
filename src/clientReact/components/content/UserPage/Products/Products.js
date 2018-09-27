import React from 'react';
import axios from "axios";
import ProductRow from "./ProductRow/ProductRow";

require('./Products.scss');

class Products extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount(){

    axios.get('/user/products')
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
      <div>
        <h3 className="text-center text-light mb-5">Your games</h3>
        <div>
          <button className={'btn btn-success'}>Add new game</button>
        </div>
        <div>
          {this.state.products.map((product)=>(
            <ProductRow key={product._id} product={product}/>
          ))}
        </div>
      </div>
    );
  }

}

export default Products;
