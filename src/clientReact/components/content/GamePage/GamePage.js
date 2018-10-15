/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: GamePage.js, Game page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import Carousel from "./Carousel/Carousel";
import {Link} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./GamePage.scss');

/**
 * Class GamePage, Game page component
 */
class GamePage extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);


    this.state = {
      product: {},
      fetchedDataIsReady: false,
    };

    this.getProduct();
  }

  componentDidMount() {

  }

  /**
   * Show game page
   */
  getProduct() {
    axios.get('/product/' + this.props.match.params.gameId)
      .then((res) => {
        this.setState({
            product: res.data.product,
            fetchedDataIsReady: true,
          }
        );

      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  /**
   * Rate game
   * @param id
   * @param values
   */
  rateProduct(id, values) {
    axios.put(`/product/${id}/rating`, {mark: values.mark})
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Add comments to the game
   * @param id
   * @param values
   */
  addProductComment(id, values) {
    axios.put(`/product/${id}/comment`, {content: values.content})
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Add game to cart
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    const {buyRent, duration} = values;
    const req = {};
    req.deal_type = buyRent === 'buy' ? 'for sale' : 'for rent';
    req.rent_duration = buyRent === 'rent' ? duration : undefined;

    axios.post('/cart/' + this.state.product._id, req)
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);
        this.props.getShoppingCart();
        this.props.history.push('/product');
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
        actions.setSubmitting(false);
      });
  }

  //Add to DOM
  render() {

    if (!this.state.fetchedDataIsReady) return null;

    const {product: {title, images, description, owner, genres, status, price, comment}} = this.state;

    let genresStr = genres.map((item) => {
      return item.name;
    }, []).join(', ');

    const sellPrice = status.indexOf('for sale') !== -1 ? price.sell : null;
    const rentPrice = status.indexOf('for rent') !== -1 ? price.rent : null;

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
                <div className="blowup">
                  <img className="img-fluid imageMainGame mb-3" src={images[0]} alt={title}/>
                </div>
                {/*Section Carousel*/}
                <Carousel/>
              </div>
              {/*Section Product details*/}
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
                    duration: 10,
                  }}
                  validationSchema={Yup.object().shape({
                    buyRent: Yup.string()
                      .required('* Select the type of purchase'),
                    duration: Yup.number()
                      .when('buyRent', {
                        is: val => val === 'rent',
                        then: Yup.number()
                          .integer('* Duration must be an integer')
                          .positive('* Duration must be positive')
                          .min(1, '* You cat rent minimum for 1 day')
                          .required('* Duration is required'),
                        otherwise: Yup.number().notRequired(),
                      })
                  })}
                  onSubmit={(values, actions) => this.handleSubmit(values, actions)}
                >
                  {({values, isSubmitting}) => (
                    <Form className="mb-3 pl-3">
                      {sellPrice && <div><label><Field type="radio" name="buyRent" value="buy"/>Buy</label></div>}
                      {rentPrice &&
                      <div>
                        <label>
                          <Field type="radio" className="mr-2" name="buyRent" value="rent"/>Rent
                        </label>
                        <Field type="number" className="ml-3" name="duration" placeholder="Enter the number of days"/>
                      </div>
                      }
                      <ErrorMessage name="buyRent">{msg => <small
                        className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      <br/>
                      {this.props.user &&
                      <button type="submit" className="btn w-50 mt-3 btnProduct" disabled={isSubmitting}>Add to
                        cart</button>}
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
        {/*Section Comments*/}
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
        {/*Section User reviews*/}
        {comment.length !== 0 &&
        <div className="container">
          <div className="row">
            <div className="col">
              <h5 className="mt-5 mb-3">User Comments</h5>
              <hr/>
              {comment.map((comm, index) => {

                return (
                  <div key={index}>
                    <p>Svitlana Melnyk</p>
                    <p className="mt-3">{comm.content}</p>
                    <small className="text-muted">{new Date(comm.date).toLocaleDateString()}</small>
                    <hr/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        }
        {/*Section Most Popular*/}
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
