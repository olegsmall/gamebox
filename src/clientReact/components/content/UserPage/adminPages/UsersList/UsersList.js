/**
 * All users list component
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
      usersList: null,
    };
    this.getUsersList();
  }

  getUsersList() {
    axios.get('/user')
      .then((res) => {
        console.log(res)
        this.setState({usersList: res.data.users.docs});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  editUserRights(user){
    this.props.setUserForEditState(user);
    this.props.changeInner('EditUserRights');
  }

  render() {
    const {usersList} = this.state;
    if (!usersList) return null;

    return (
      <div className="col-md-8 text-center mt-5">
        <h5 className="text-center">Users List</h5>
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
            if (user.role === 'SuperUser') return;

            return (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td><a
                  onClick={(e) => {
                    e.preventDefault();
                    this.editUserRights(user);
                  }}
                  href="">Edit</a></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

