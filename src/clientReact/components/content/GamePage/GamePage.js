import React from 'react';
import axios from 'axios';
import Carousel from "./Carousel/Carousel";
import {Link} from "react-router-dom";

require('./GamePage.scss');

class GamePage extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      product: {},
      fetchedDataIsReady: false,
    };
  }

  componentDidMount() {
    axios.get('/product/' + this.props.match.params.gameId)
      .then((res) => {
        console.log(res.data.product);
        this.setState({
            product: res.data.product,
            fetchedDataIsReady: true,
          }
        );

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    if (!this.state.fetchedDataIsReady) return null;

    const {product: {title, images, description, owner, genres}} = this.state;

    let genresStr = genres.reduce((accum, current)=> ', ' + current.name, '');

// debugger
    return (
      <div className={"GamePage"}>
        <div>
          <img className="d-block w-100 imgMain" src="/image/Trine_-_Wizard_Knight_Caverns.jpg" alt="Game image"/>
        </div>
        <div id="gamePage">
          <h3 className="text-center mb-4 mb-sm-5">{title}</h3>
          <div className="container mb-4">
            <div className="row">
              <div className="col-md-6 sectionImage">
                <img className="img-fluid imageMainGame" src={images[0]} alt={title}/>
              </div>
              <div className="col-md-6 text-center text-md-left">
                <div className=" mt-4 mt-md-0 mb-3 pl-3">
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
                </div>
                <p className="pl-3">Product seller : {owner.firstName + owner.lastName}</p>
                <p className="pl-3">Genre : {genresStr}</p>
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
              <h3 className="my-4 text-center">Discover the world of {title}</h3>
              <p>
                {description}
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
              <button className="btn btn-block btnViewMore">
                <Link className="nav-link linkViewMore" to={'/product'}>View more</Link>
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default GamePage;
