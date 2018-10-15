/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: PaymentConfirmation.js, Payment confirmation component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";

require('./PaymentConfirmation.scss');

/**
 * Class PaymentConfirmation, Payment confirmation component
 */
export default class PaymentConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ordersList: null,
    };

    this.getOrdersWaitingPaymentConfirmation();

  }

  /**
   * Show orders waiting payment confirmation
   */
  getOrdersWaitingPaymentConfirmation() {
    axios.get('/order?status=pending')
      .then((res) => {
        this.setState({ordersList: res.data.orders.docs});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Confirm payment
   * @param orderId
   */
  confirmPayment(orderId) {
    axios.patch('/order', {id: orderId})
      .then((res) => {
        this.getOrdersWaitingPaymentConfirmation();
        this.props.showSystemMessage(res.data.message);

      })
      .catch((error) => {
        console.error(error.response)
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  //Add to DOM
  render() {
    const {ordersList} = this.state;
    if (!ordersList) {
      return (
        <div className="col-md-8 text-center mt-5">
          No new orders for confirmation
        </div>
      );
    }
    return (
      <div className="PaymentConfirmation col-md-8 text-center mt-3">
        <h5 className="text-center">Status of Payment</h5>
        <table className="table table-hover">
          <thead className="bg-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Order id</th>
            <th scope="col">User</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {ordersList.map((order) => {
            const orderDate = new Date(order.opened).toLocaleDateString();
            return (
              <tr key={order._id}>
                <td>{orderDate}</td>
                <td>{order._id}</td>
                <td>{`${order.buyer.firstName} ${order.buyer.lastName}`}</td>
                <td>{order.buyer.email}</td>
                <td><a
                  onClick={(e) => {
                    e.preventDefault();
                    this.confirmPayment(order._id);
                  }}
                  href="">Confirm</a></td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

