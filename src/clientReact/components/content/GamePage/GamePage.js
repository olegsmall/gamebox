import React from 'react';
import axios from 'axios';
import Carousel from "./Carousel/Carousel";
import {Link} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

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

  handleSubmit(values, actions) {
    const{buyRent, duration} = values;
    const req = {};
    req.deal_type = buyRent === 'buy' ? 'for sale' : 'for rent';
    req.rent_duration = duration !== '' ? duration : undefined;

    axios.post('/cart/' + this.state.product._id, req)
      .then((res) => {
        console.log(res);
        this.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);
        this.props.history.push('/product');
      })
      .catch((error) => {
        console.log(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
        actions.setSubmitting(false);
      });
  }

  render() {

    if (!this.state.fetchedDataIsReady) return null;

    const {product: {title, images, description, owner, genres, status, price}} = this.state;

    let genresStr = genres.map((item) => {
      // debugger
      return item.name;
    }, []).join(', ');

    const sellPrice = status.indexOf('for sale') !== -1 ? price.sell : null;
    const rentPrice = status.indexOf('for rent') !== -1 ? price.rent : null;


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
                <img className="img-fluid imageMainGame mb-3" src={images[0]} alt={title}/>
                <Carousel/>
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
                <p className="pl-3">Product seller : {`${owner.firstName} ${owner.lastName}`}</p>
                <p className="pl-3">Genre : {genresStr}</p>
                {sellPrice && <p className="pl-3">Purchase price : <span className="price">{sellPrice}$</span></p>}
                {rentPrice && <p className="pl-3">Rent price : <span className="price">{rentPrice}$</span></p>}
                <Formik
                  initialValues={{
                    buyRent: '',
                  }}
                  validationSchema={Yup.object().shape({
                    buyRent: Yup.string()
                      .required('* Select the type of purchase'),
                  })}
                  onSubmit={(values, actions) => this.handleSubmit(values, actions)}
                >
                  {({values, isSubmitting}) => (
                    <Form className="mb-3 pl-3">
                      {sellPrice && <label><Field type="radio" name="buyRent" value="buy"/>Buy</label>}
                      {rentPrice && <label><Field type="radio" className="mr-2" name="buyRent" value="rent"/>Rent</label>}
                      <ErrorMessage name="buyRent">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      <input type="number" className="ml-3" name="rentalDuration" placeholder="Enter the number of days"/>
                      <br/>
                      <button type="submit" className="btn w-50 mt-3 btnProduct" disabled={isSubmitting}>Add to cart</button>
                    </Form>
                  )}
                </Formik>
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
        {/*<div className="container">*/}
          {/*<div className="row justify-content-center">*/}
            {/*<div className="col">*/}
              {/**/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
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
