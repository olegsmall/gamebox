/**
 * User statistics component
 *
 * file: Statistics.js
 * Created by: Oleg Smolovyk.
 * Date: 10/11/2018
 * Time: 15:54
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./Statistics.scss');

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: null,
    };

    this.getStatistic();
  }

  getStatistic(){
    axios.get('/user/statistics')
      .then((res) => {
        this.setState({statistics: res.data.statistics});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  render() {

    const {statistics} = this.state;
    if (!statistics) {
      return (
        <div className="col-md-8 text-center mt-5">
          No statistic available
        </div>
      );
    }

    return (
      <div className="col-md-8 text-center mt-5">
        <div className="card">
          <h5 className="card-header text-center">Statistics</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Added products
              <span className="badge badge-primary badge-pill">{statistics.products_added}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Sold Products
              <span className="badge badge-primary badge-pill">{statistics.sold}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Rented products
              <span className="badge badge-primary badge-pill">{statistics.rented}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Ordered products
              <span className="badge badge-primary badge-pill">{statistics.ordered}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Posted articles
              <span className="badge badge-primary badge-pill">{statistics.posted_articles}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Commented articles
              <span className="badge badge-primary badge-pill">{statistics.commented_articles}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Commented products
              <span className="badge badge-primary badge-pill">{statistics.commented_products}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


