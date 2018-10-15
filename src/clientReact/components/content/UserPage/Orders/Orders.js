/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Orders.js, All user orders component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';

require('./Orders.scss');

/**
 * Class Orders, All user orders component
 */
class Orders extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {
      ordersList: null,
    };

    this.getOrders();

  }

  /**
   * Show all orders
   */
  getOrders() {
    axios.get('/user/order')
      .then((res) => {
        this.setState({ordersList: res.data.orders.docs});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  //Add to DOM
  render() {
    const {ordersList} = this.state;
    if (!ordersList) {
      return (
        <div className="col-md-8 text-center mt-5">
          You don't have any orders
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
            <th scope="col">Items</th>
            <th scope="col">Total amount</th>
            <th scope="col">Payment method</th>
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
                <td>{order.total_items}</td>
                <td>{order.total_price}</td>
                <td>{order.payment_method}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }

}

export default Orders;
