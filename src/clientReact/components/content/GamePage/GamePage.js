import React from 'react';
import axios from 'axios';
import Carousel from "./Carousel/Carousel";

require('./GamePage.scss');

class GamePage extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    axios.get('/product/' + this.props.match.params.gameId)
      .then((res) => {
        console.log(res.data);
        this.setState({product: res.data.product});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const mainImage = (this.state.product.images && this.state.product.images.length > 0)? this.state.product.images[0] : '';
    const mainImageSrc = '/image/' + mainImage;
    return (
      <div className={"GamePage"}>
        <div>
          <img className="d-block w-100 imgMain" src="/image/Trine_-_Wizard_Knight_Caverns.jpg" alt="Game image"/>
        </div>
        <div id="gamePage">
          <h3 className="text-center mb-4 mb-sm-5">{this.state.product.title}</h3>
          <div className="container mb-4">
            <div className="row">
              <div className="col-md-6 sectionImage">
                <img className="img-fluid imageMainGame" src={mainImageSrc} alt={this.state.product.title}/>
              </div>
              <div className="col-md-6 text-center text-md-left">
                <form className=" mt-4 mt-md-0 mb-3 pl-3">
                  <div className="form-check form-check-inline">
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <div className="form-check form-check-inline">
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <div className="form-check form-check-inline">
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <div className="form-check form-check-inline">
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <div className="form-check form-check-inline">
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                </form>
                <p className="pl-3">Product seller : Markus Persson</p>
                <p className="pl-3">Genre : Strategy, Adventure, etc.</p>
                <p className="pl-3">Purchase price : <span className="price">300$</span></p>
                <p className="pl-3">Rent price : <span className="price">30$</span></p>
                <form className="mb-3 pl-3">
                  <input type="radio" name="radio"/> Buy
                  <input type="radio" className="ml-3" name="radio"/> Rent
                </form>
                <button className="btn w-50 mt-2 btnProduct">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="my-4 text-center">Discover the world of {this.state.product.title}</h3>
              <p>
                {this.state.product.description}
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
            <Carousel/>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 text-nowrap">
              <form>
                <h5 id="marginCom">Write a comment</h5>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-pencil"></i></span>
                  </div>
                  <textarea className="form-control form-control-lg font-input"
                            name="comments"
                            placeholder="Your comments"
                            rows="5">
                  </textarea>
                </div>
                <input type="submit" value="Send" className="btn btn-sm btn-block btnGameComments"/>
              </form>
            </div>
          </div>
        </div>

        <div className="container mb-5">
          <h5 className="mt-4 ml-5 text-center">Most popular</h5>
          <div className="card-deck mt-4">
            <div className="card product text-center cardPopular-1">
              <div className="inner">
                <div className="paragraphV text-light">4,5</div>
                <a href="#"><h4 className="paragraphV pt-5">Game's Name</h4></a>
                <button className="button mt-5"><a href="#">View More</a></button>
              </div>
            </div>
            <div className="card product text-center cardPopular-2">
              <div className="inner">
                <div className="paragraphV text-light">4,5</div>
                <a href="#"><h4 className="paragraphV pt-5">Game's Name</h4></a>
                <button className="button mt-5"><a href="#">View More</a></button>
              </div>
            </div>
            <div className="card product text-center cardPopular-3">
              <div className="inner">
                <div className="paragraphV text-light">4,5</div>
                <a href="#"><h4 className="paragraphV pt-5 ">Game's Name</h4></a>
                <button className="button mt-5"><a href="#">View More</a></button>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-md-2">
              <button className="btn btn-block btnViewMore">View more</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default GamePage;
