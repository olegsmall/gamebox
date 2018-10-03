import React from 'react';

require('./Profile.scss');

class Profile extends React.Component {

  handleEditPrifile(e){
    e.preventDefault();
    this.props.changeInner('EditProfile');
  }

  render() {

    const firstName = (this.props.user !== null) ? this.props.user.firstName : '';
    const lastName = (this.props.user !== null) ? this.props.user.lastName : '';
    const email = (this.props.user !== null) ? this.props.user.email : '';
    const phone = (this.props.user !== null) ? this.props.user.phone : '';
    const address = (this.props.user !== null) ? this.props.user.address : '';
    const avatar = (this.props.user !== null) ? this.props.user.avatar : '';


    return (
      <div>
        <div className={'d-flex flex-row flex-nowrap justify-content-between mb-5'}>
          <h3 className="text-center text-light">Your account</h3>
          <button className={'btn btn-success'} onClick={this.handleEditPrifile.bind(this)}>Edit profile</button>
        </div>
        <div className={'justify-content-center'}>
          <div className={'text-center'}>
            <div className="text-light text-center mb-2">
              <img src={avatar} alt="avatar" width="100" height="100" className="ml-3"/>
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
            <div className="text-light mb-2">Address : {address}</div>

          </div>
        </div>
      </div>
    );
  }

}

export default Profile;
