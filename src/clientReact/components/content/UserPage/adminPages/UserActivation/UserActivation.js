/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: UserActivation.js, User activation component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";

require('./UserActivation.scss');

/**
 * Class UserActivation, User activation component
 */
export default class UserActivation extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {
      usersList: null,
    };

    this.getDeactivatedUsersList();
  }

  /**
   * Deactivate users
   */
  getDeactivatedUsersList() {
    axios.get('/user/?user=deactivated')
      .then((res) => {
        this.setState({usersList: res.data.users.docs});
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Activate users
   * @param userId
   */
  activateUser(userId) {
    axios.put(`/user/${userId}/status`, {status: 'activated'})
      .then((res) => {
        this.getDeactivatedUsersList();
        this.props.showSystemMessage(res.data.message);

      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  //Add to DOM
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

