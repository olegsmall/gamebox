import React from 'react';

require('./ShoppingCart.scss');

class ShoppingCart extends React.Component {
  render() {
    return (
      <div className={'ShoppingCart'}>
        <div>
          <img className="img-fluid d-block w-100 imgMain" src="/image/back11.jpg" alt="Cart image"/>
        </div>
        <h5 className="pt-4 mt-2 ml-5">Hi, user</h5>
        <div id="myOrders" className="container">
          <div className="h5 ml-5 mb-2 text-center text-sm-left">My shopping cart</div>
          <hr/>
            <div className="container">
              <a className="linkArticle" href="#">
                <div className="card border-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <img className="img-fluid mr-5 imageShopCart"
                             src="/image/outdoors-3106126_1280.jpg"
                             alt="Card image"
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title mb-2 mt-3">Title : </h5>
                        <div className="mb-1">Buy price :</div>
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-block btnShopCart mt-3">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <hr/>
                <a className="linkArticle" href="#">
                  <div className="card border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <img className="img-fluid mr-5 imageShopCart"
                               src="/image/scifi-3617337_1280.jpg"
                               alt="Card image"
                          />
                        </div>
                        <div className="col-md-6">
                          <h5 className="card-title mb-2 mt-3">Title : </h5>
                          <div className="mb-1">Rent price :</div>
                          <div className="mb-1">Rent duration :</div>
                        </div>
                        <div className="col-md-2">
                          <button className="btn btn-block btnShopCart mt-3">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <hr/>
                  <a className="linkArticle" href="#">
                    <div className="card border-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <img className="img-fluid mr-5 imageShopCart"
                                 src="/image/tank-2902209_1280.jpg"
                                 alt="Card image"
                            />
                          </div>
                          <div className="col-md-6">
                            <h5 className="card-title mb-2 mt-3">Title : </h5>
                            <div className="mb-1">Buy price :</div>
                          </div>
                          <div className="col-md-2">
                            <button className="btn btn-block btnShopCart mt-3">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <hr/>
                    <div className="h5 ml-5 mb-2 text-center text-sm-left">Order summary</div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-1">Your name :</div>
                        <div className="mb-1">Address :</div>
                        <div className="mb-1">Phone number :</div>
                        <hr/>
                          <div className="mb-1">Select a payment</div>
                          <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="payment"
                                   id="checkRadio"
                                   value="option1"
                                   checked
                            />
                              <label className="form-check-label" htmlFor="checkRadio">
                                Check
                              </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="payment"
                                   id="cashRadio"
                                   value="option2"
                            />
                              <label className="form-check-label" htmlFor="cashRadio">
                                Cash
                              </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="payment"
                                   id="paypalRadios"
                                   value="option3"
                            />
                              <label className="form-check-label" htmlFor="paypalRadios">
                                PayPal
                              </label>
                          </div>
                          <hr/>
                            <div className="card-title mb-1">Total before tax :</div>
                            <div className="mb-1">Estimated tax (GST + QST) — 14.975% :</div>
                            <div className="mb-1">Order total : CAD $</div>
                        <div className="row">
                            <div className="col-md-4">
                              <button className="btn-block btn btnShopCart mt-3">Confirm order</button>
                            </div>
                            <div className="col-md-4">
                              <button className="btn-block btn btnShopCart mt-3 mr-3">Continue shopping</button>
                            </div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;