import React from 'react';
import {Link} from 'react-router-dom';
import Axios from "axios";

require('./EditProfile.scss');

class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: this.props.user.avatar,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      phone: this.props.user.phone,
      address: this.props.user.address,
      password: '',
      passwordConf: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmitUserData(event) {
    event.preventDefault();

    //TODO: validation of form data.

    Axios.put('/user/', {
      avatar: this.state.avatar,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    })
      .then((res) => {
        this.props.showMessage(res.data.message);
        this.props.changeInner('Profile');
        console.log(res);
      })
      .catch((error) => {
        this.props.showMessage(res.data.message);
        console.log(error);
      });
  }

  handleSubmitPassword(event) {
    event.preventDefault();

    //TODO: validation of form data.

    Axios.put('/user/password', {
      password: this.state.userPassword,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <div className={'EditProfile'}>
        <form className="mt-3" onSubmit={this.handleSubmitUserData.bind(this)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                name="firstName"
                type="text"
                className="form-control form-control-sm"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control form-control-sm"
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
              <input
                name="email"
                type="email"
                className="form-control form-control-sm"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
              <input
                name="phone"
                type="text"
                className="form-control form-control-sm"
                placeholder="Phone number"
                value={this.state.phone}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control form-control-sm"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
              <input
                name="avatar"
                type="text"
                className="form-control form-control-sm"
                placeholder="Avatar"
                value={this.state.avatar}
                onChange={this.handleInputChange}/>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-block mb-3 buttonEditProfile">
            Save profile
          </button>
        </form>
        <form onSubmit={this.handleSubmitPassword.bind(this)}>
          <p className="text-light">
            Change password
          </p>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                name="password"
                type="password"
                className="form-control form-control-sm"
                placeholder="Your password"
                value={this.state.password}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
              <input
                type="password"
                className="form-control form-control-sm"
                name="passwordConf"
                placeholder="Your new password"
                value={this.state.passwordConf}
                onChange={this.handleInputChange}/>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-block buttonEditProfile">
              Save password
            </button>
            <a
              className="btn btn-sm btn-block buttonEditClose mb-4"
              href={''}
              onClick={this.props.goToProfile}>
              Close
            </a>
          </div>
        </form>
      </div>
    );
  }

}

export default EditProfile;
