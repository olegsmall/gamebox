/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: PaymentConfirmation.js, Payment confirmation component
 * Authors: Oleg Smolovyk, Piotr Iablocichin, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./PaymentConfirmation.scss');

export default class PaymentConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

