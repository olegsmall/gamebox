/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: UsersList.js, All users list component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";

require('./UsersList.scss');

/**
 * Class UsersList, All users list component
 */
export default class UsersList extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {
      usersList: null,
    };
    this.getUsersList();
  }

  /**
   * Show all users
   */
  getUsersList() {
    axios.get('/user')
      .then((res) => {
        this.setState({usersList: res.data.users.docs});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Edit users' rights
   * @param user
   */
  editUserRights(user){
    this.props.setUserForEditState(user);
    this.props.changeInner('EditUserRights');
  }

  //Add to DOM
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

