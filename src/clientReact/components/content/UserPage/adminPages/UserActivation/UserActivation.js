/**
 * User activation component
 *
 * file: UserActivation.js
 * Created by: Oleg Smolovyk.
 * Date: 10/10/2018
 * Time: 13:25
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./UserActivation.scss');

export default class UserActivation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: null,
    };

    this.getDeactivatedUsersList();
  }

  getDeactivatedUsersList() {
    axios.get('/user/?user=deactivated')
      .then((res) => {
        console.log(res.data)
        this.props.showSystemMessage(res.data.message);
        // this.props.changeInner('Profile');
        // actions.setSubmitting(false);
      })
      .catch((error) => {
        this.props.showSystemMessage(res.data.message);
        // actions.setSubmitting(false);
      });
  }

  render() {
    if (!this.state.usersList) return null;

    return (
      <div className="col-md-8 text-center mt-5">
        <h5 className="text-center">Waiting for activation</h5>
        <table className="table table-hover">
          <thead className="bg-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Svitlana</td>
            <td>Svitlana@gmail.com</td>
            <td><a href="">Not active</a></td>
          </tr>
          <tr>
            <td>Fred</td>
            <td>Fred@gmail.com</td>
            <td><a href="">Not active</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

