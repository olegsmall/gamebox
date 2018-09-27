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

  handleAddProduct(e){
    e.preventDefault();
    this.props.changeInnerComponent(e, 'AddProduct');
  }

  render() {

    return (
      <div>
        <div className={'d-flex flex-row flex-nowrap justify-content-between mb-5'}>
          <h3 className="text-center text-light">Your games:</h3>
          <button className={'btn btn-success'} onClick={this.handleAddProduct.bind(this)}>Add game</button>
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
