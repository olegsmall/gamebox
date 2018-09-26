import React from 'react';

require('./Profile.scss');

class Profile extends React.Component {


  render() {

    const firstName = (this.props.user !== null) ? this.props.user.firstName : '';
    const lastName = (this.props.user !== null) ? this.props.user.lastName : '';
    const email = (this.props.user !== null) ? this.props.user.email : '';
    const phone = (this.props.user !== null) ? this.props.user.phone : '';

    return (
      <div>
        <h3 className="text-center text-light mb-5">Your account</h3>
        <div className={'justify-content-center'}>
          <div className={'text-center'}>
            <div className="text-light text-center mb-2">
              <img src="/image/img_avatar.png" alt="avatar" width="100" height="100" className="ml-3"/>
            </div>
            <div className="text-light mb-2">
              <i className=" ml-3 fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <div className="text-light mb-2">First name : {firstName}</div>
            <div className="text-light mb-2">Last Name : {lastName}</div>
            <div className="text-light mb-2">Email : {email}</div>
            <div className="text-light mb-2">Phone : {phone}</div>

          </div>
        </div>
      </div>
    );
  }

}

export default Profile;
