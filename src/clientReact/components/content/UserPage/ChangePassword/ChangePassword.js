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
        <form className="text-center formChangePassword" onSubmit={this.handleSubmitPassword.bind(this)}>
          <div className="form-row mt-2">
            <div className="form-group col-md-6">
              <input
                name="password"
                type="password"
                className="form-control inputPass"
                placeholder="Your password"
                value={this.state.password}
                onChange={this.handleInputChange}/>
              <small className="form-text text-left error">*Please enter your password</small>
            </div>
            <div className="form-group col-md-6">
              <input
                type="password"
                name="passwordConf"
                className="form-control inputPass"
                placeholder="Your new password"
                value={this.state.passwordConf}
                onChange={this.handleInputChange}/>
              <small className="form-text text-left error">*Please enter your new password</small>
            </div>
            <div className="form-group col-md-12">
              <button
                type="submit"
                className="btn-block btn mt-2 btnPass">
                Save new password
              </button>
              <a
                className="btn-block btn mt-2 btnPass"
                href={''}
                onClick={this.props.goToProfile}>
                Close
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default ChangePassword;
