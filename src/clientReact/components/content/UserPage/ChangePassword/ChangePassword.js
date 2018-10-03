import React from 'react';
import {Link} from 'react-router-dom';
import Axios from "axios";

require('./ChangePassword.scss');

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

  handleSubmitPassword(event) {
    event.preventDefault();
    if (this.state.password === '') {
      this.props.showMessage('Password can not be empty');
      return;
    }
    if (this.state.password !== this.state.passwordConf) {
      this.props.showMessage('Passwords are not match');
      return;
    }

    Axios.put('/user/password', {
      password: this.state.password,
    })
      .then((res) => {
        this.props.showMessage(res.data.message);
        this.props.changeInner('Profile');
      })
      .catch((error) => {
        this.props.showMessage(res.data.message);
      });
  }

  render() {

    return (
      <div className={'ChangePassword'}>
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
                name="passwordConf"
                className="form-control form-control-sm"
                placeholder="Your new password"
                value={this.state.passwordConf}
                onChange={this.handleInputChange}/>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-block buttonEditProfile">
              Save
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

export default ChangePassword;
