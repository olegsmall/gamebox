/**
 * Panment comfirmation component
 *
 * file: PaymentConfirmation.js
 * Created by: Oleg Smolovyk.
 * Date: 10/10/2018
 * Time: 13:22
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

