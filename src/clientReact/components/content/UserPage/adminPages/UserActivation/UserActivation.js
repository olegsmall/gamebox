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
        this.setState({usersList: res.data.users.docs});
      })
      .catch((error) => {
        console.log(error.response)
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  activateUser(userId) {
    // console.log(userId)
    axios.put(`/user/${userId}/status`, {state: 'activated'})
      .then((res) => {
        this.getDeactivatedUsersList();
        this.props.showSystemMessage(res.data.message);

      })
      .catch((error) => {
        console.log(error.response)
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  render() {
    const {usersList} = this.state;
    if (!usersList) {
      return (
        <div className="col-md-8 text-center mt-5">
          No new users for activation
        </div>
      );
    }

    return (
      <div className="col-md-8 text-center mt-5">
        <h5 className="text-center">Waiting for activation</h5>
        <table className="table table-hover">
          <thead className="bg-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {usersList.map((user) => {
            return (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td><a
                  onClick={(e) => {
                    e.preventDefault();
                    this.activateUser(user._id);
                  }}
                  href="">Activate</a></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

