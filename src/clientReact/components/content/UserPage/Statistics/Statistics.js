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
      statistic: null,
    };

    this.getStatistic();
  }

  getStatistic(){
    axios.get('/user/statistics')
      .then((res) => {
        console.log(res.data)
        this.setState({statistic: res.data.statistics});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  render() {

    const {statistic} = this.state;
    if (!statistic) {
      return (
        <div className="col-md-8 text-center mt-5">
          No statistic available
        </div>
      );
    }

    return (
      <div>

      </div>
    );
  }
}


