/**
 * Messanger component
 *
 * file: Messanger.js
 * Created by: Oleg Smolovyk.
 * Date: 10/11/2018
 * Time: 15:56
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./Messenger.scss');

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  getMessages() {

  }

  render() {

    return (
      <div>
        Messenger
      </div>
    );
  }
}

