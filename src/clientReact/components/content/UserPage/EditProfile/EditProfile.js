import React from 'react';
import {Link} from 'react-router-dom';

require('./EditProfile.scss');

class EditProfile extends React.Component {


  render() {

    return (
      <div className={'EditProfile'}>
        <form className="mt-3" >
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="text"
                     className="form-control form-control-sm"
                     id="inputName"
                     placeholder="First Name"
              />
            </div>
            <div className="form-group col-md-6">
              <input type="text"
                     className="form-control form-control-sm"
                     id="inputSurname"
                     placeholder="Last Name"/>
            </div>
            <div className="form-group col-md-6">
              <input type="email"
                     className="form-control form-control-sm"
                     id="inputEmail"
                     placeholder="E-mail"/>
            </div>
            <div className="form-group col-md-6">
              <input type="text"
                     className="form-control form-control-sm"
                     id="inputPhoneNumber"
                     placeholder="Phone number"/>
            </div>
          </div>
          <div className="form-group">
            <input type="text"
                   className="form-control form-control-sm"
                   id="inputAddress"
                   placeholder="Address"/>
          </div>
          <button type="submit"
                  className="btn btn-sm btn-block mb-3 buttonEditProfile">
            Edit your info
          </button>
        </form>
        <form >
          <p className="text-light">
            Your password [ edit ]
          </p>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="password"
                     className="form-control form-control-sm"
                     id="inputPassword"
                     placeholder="Your password"/>
            </div>
            <div className="form-group col-md-6">
              <input type="password"
                     className="form-control form-control-sm"
                     id="inputConfPassword"
                     placeholder="Your new password"/>
            </div>
            <button type="submit"
                    className="btn btn-sm btn-block buttonEditProfile">
              Edit your password
            </button>
            <a className="btn btn-sm btn-block buttonEditClose mb-4" href={''} onClick={this.props.goToProfile}>Close</a>
          </div>
        </form>
      </div>
    );
  }

}

export default EditProfile;
