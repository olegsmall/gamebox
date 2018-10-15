/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ShoppingCart.js, Shopping cart component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */


import React from 'react';
import axios from "axios";
import {Link,} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./ShoppingCart.scss');

/**
 * Class ShoppingCart, Shopping cart component
 */
class ShoppingCart extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {
    this.payPallButtonInit();
  }

  /**
   * Payment by PayPal
   */
  payPallButtonInit() {
    paypal.Button.render({
      // Configure environment
      env: 'sandbox',
      client: {
        sandbox: 'AcpyaszloX0COQAbRdPXQiu5e5pJ8WRHZm3C6WKHkTvYI0CTCXj5Ca2AcbcX0DdA25689MRm2zM9hia5',
        production: 'demo_production_client_id'
      },
      // Customize button (optional)
      locale: 'en_US',
      style: {
        label: 'checkout',
        size: 'medium',    // small | medium | large | responsive
        shape: 'rect',     // pill | rect
        color: 'gold',
        tagline: 'false'
      },
      // Set up a payment
      payment: function (data, actions) {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: '100',
              currency: 'USD'
            }
          }]
        });
      },
      // Execute the payment
      onAuthorize: function (data, actions) {
        return actions.payment.execute().then(function () {
          // Show a confirmation message to the buyer
          document.getElementById('sumbmit-button').click();
        });

      }
    }, '#paypal-button');
  }

  /**
   * Delete game
   */
  deleteProduct(id) {
    axios.delete('/cart/' + id)
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
        this.props.getShoppingCart();
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message);
      });
  }

  /**
   * Confirm order
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    axios.post('/order', {payment_method: values.payment})
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
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
    const {shoppingCart, user} = this.props;

    // if (!user) {

      const onSuccess = (payment) => {
        console.info("Your payment was succeeded!", payment);
      }
      const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.info('You have cancelled the payment!', data);
      }
      const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.info("Error!", err);
      }
      let currency = 'USD'; // or you can set this value from your props or state
      let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout


    // }

    return (
      <div className={'ShoppingCart'}>
        <div>
          <img className="img-fluid d-block w-100 imgMain" src="/image/back11.jpg" alt="Cart image"/>
        </div>
        <div id="myOrders" className="container">
          <div className="h5 ml-5 mb-2 text-center text-sm-left">My shopping cart</div>
          <hr/>
          { !user || !shoppingCart
            ? <div>Shopping cart is empty</div>
            : <div className="container">
              {shoppingCart.products.map(({product, deal_type, rent_duration, _id: cardItemId}) => {
                // if (product === undefined) return null;
                return (
                  <div key={product._id}>
                    <a className="linkArticle" href="#">
                      <div className="card border-0">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <img className="img-fluid mr-5 imageShopCart" src={product.images[0]}
                                   alt={product.title}/>
                            </div>
                            <div className="col-md-6">
                              <h5 className="card-title mb-2 mt-3">{product.title}</h5>
                              {deal_type === 'for sale' ? <div className="mb-1">Buy: {product.price.sell}$</div> : ''}
                              {deal_type === 'for rent' ? <div className="mb-1">
                                <div>Rent/day: {product.price.rent}$</div>
                                <div>Duration: {rent_duration} days</div>
                                <div>Total: {product.price.rent * rent_duration}$</div>
                              </div> : ''}
                            </div>
                            <div className="col-md-2">
                              <button
                                className="btn btn-block btnShopCart mt-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.deleteProduct(cardItemId);
                                }}

                              >Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <hr/>
                  </div>
                );
              })}

              <div className="h5 ml-5 mb-2 text-center text-sm-left">Order summary</div>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-1">Your name: {`${user.firstName} ${user.lastName}`}</div>
                  <div className="mb-1">Address: {user.address}</div>
                  <div className="mb-1">Phone: {user.phone}</div>
                  <hr/>
                  <div className="mb-1">Select a payment</div>
                  <Formik
                    initialValues={{
                      payment: 'paypal',
                    }}
                    validationSchema={Yup.object().shape({
                      payment: Yup.string()
                        .required('* Select peyment type'),
                    })}
                    onSubmit={(values, actions) => this.handleSubmit(values, actions)}
                  >
                    {({values, isSubmitting}) => (
                      <Form id="checkout-form">
                        <div className="form-check">
                          <label className="form-check-label">
                            <Field className="form-check-input"
                                   name="payment"
                                   type="radio"
                                   value="check"
                                   checked={values.payment === 'check'}
                            />
                            Check
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <Field className="form-check-input"
                                   name="payment"
                                   type="radio"
                                   value="cash"
                                   checked={values.payment === 'cash'}
                            />
                            Cash
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <Field className="form-check-input"
                                   name="payment"
                                   type="radio"
                                   value="paypal"
                                   checked={values.payment === 'paypal'}
                            />
                            PayPal
                          </label>
                        </div>
                        <ErrorMessage name="payment">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                        <hr/>
                        <div className="mb-1">Order total : {shoppingCart.total_price}$</div>
                        <div className="row">
                          <div className="col-md-4">
                            <button
                              id="sumbmit-button"
                              type="submit"
                              className={`btn-block btn btnShopCart mt-3 ${values.payment === 'paypal' ? 'd-none' : ''}`}
                              disabled={isSubmitting}
                            >Confirm order
                            </button>
                            <div id="paypal-button"
                                 className={`mt-3 ${values.payment !== 'paypal' ? 'd-none' : ''}`}></div>
                          </div>
                          <div className="col-md-4">
                            <Link to={'/product'}>
                              <button className="btn-block btn btnShopCart mt-3 mr-3">Continue shopping</button>
                            </Link>

                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
