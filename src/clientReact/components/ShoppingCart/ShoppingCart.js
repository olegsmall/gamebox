import React from 'react';
import axios from "axios";
import {Link,} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./ShoppingCart.scss');

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.props.getShoppingCart();
  }

  deleteProduct(id) {
    axios.delete('/cart/' + id)
      .then((res) => {
        console.log(res);
        this.props.showSystemMessage(res.data.message);
        this.props.getShoppingCart();
      })
      .catch((error) => {
        console.log(error.response);
        this.props.showSystemMessage(error.response.data.message);
      });
  }

  handleSubmit(values, actions) {
    debugger;
    let formData = new FormData();

    formData.append('payment', values.payment);

    axios.put('/order/', formData)
      .then((res) => {
        console.log(res.data);
        // self.props.showSystemMessage(res.data.message);
        // actions.setSubmitting(false);
        // self.props.changeInner('Products');
      })
      .catch((error) => {
        console.log(error.response);
        // self.props.showSystemMessage(error.message, 'error');
        // actions.setSubmitting(false);
      });
  }

  render() {
    const {shoppingCart: shopProducts, user} = this.props;

    return (
      <div className={'ShoppingCart'}>
        <div>
          <img className="img-fluid d-block w-100 imgMain" src="/image/back11.jpg" alt="Cart image"/>
        </div>
        <div id="myOrders" className="container">
          <div className="h5 ml-5 mb-2 text-center text-sm-left">My shopping cart</div>
          <hr/>
          {shopProducts.products.length === 0
            ? <div>Shopping cart is empty</div>
            : <div className="container">
              {shopProducts.products.map(({product, deal_type, rent_duration, _id: cardItemId}) => {
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
                      <Form>
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
                        {/*<div className="card-title mb-1">Total: </div>*/}
                        {/*<div className="mb-1">Estimated tax (GST + QST) — 14.975% :</div>*/}
                        <div className="mb-1">Order total : $</div>
                        <div className="row">
                          <div className="col-md-4">
                            <button type="submit" className="btn-block btn btnShopCart mt-3"
                                    disabled={isSubmitting}>Confirm order
                            </button>
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
