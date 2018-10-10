/**
 * All user list component
 *
 * file: UsersList.js
 * Created by: Oleg Smolovyk.
 * Date: 10/10/2018
 * Time: 13:27
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./UsersList.scss');

export default class UsersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: []
    };
  }

  componentDidMount() {

  }

  getUsersList() {
    axios.get('/user', {
      // password: values.password,
    })
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
        this.props.changeInner('Profile');
        actions.setSubmitting(false);
      })
      .catch((error) => {
        this.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);
      });
  }


  render() {
    return (
      <div>

      </div>
    );
  }
}

