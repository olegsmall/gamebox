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
      <div className={"Profile"}>
        <img src={avatar} alt="avatar" width="100" height="100" className="mt-4"/>
        <div className="mt-2 mb-2">
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
        </div>
        <div>First name : {firstName}</div>
        <div className="mt-2">Last Name : {lastName}</div>
        <div className="mt-2">Email : {email}</div>
        <div className="mt-2">Phone : {phone}</div>
        <button className={'mt-2 mb-2 btn btnEditProf'} onClick={this.handleEditPrifile.bind(this)}>Edit profile</button>
      </div>
    );
  }

}

export default Profile;
