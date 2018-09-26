import React from 'react';
import axios from "axios";

require('./UserPage.scss');

class UserPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount(){
    axios.get('/user/')
      .then((res) => {
        console.log(res.data);
        this.setState({user: res.data.user});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    const firstName = (this.state.user !== null) ? this.state.user.firstName : '';
    const lastName = (this.state.user !== null) ? this.state.user.lastName : '';
    const email = (this.state.user !== null) ? this.state.user.email : '';
    const phone = (this.state.user !== null) ? this.state.user.phone : '';

    // let user = {};
    // if (this.state.user !== null){
    //   user = this.state.user;
    // }
    return (
      <div className={'UserPage'}>
        <div id="hi-bg" className="alert alert-secondary h3 text-light" role="alert">
          <div className={'container'}>Hi, {firstName + ' ' + lastName}</div>
        </div>

        <div className="container d-flex flex-row">
          <div className="col-4">
            <a href="">
              <p className="text-light">
                <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                Your Orders
              </p>
            </a>
            <a href="">
              <p className="text-light">
                <img src="/image/list.png" alt="games-list" width="50" height="50" className="mr-3"/>
                Your games
              </p>
            </a>
            <a href="">
              <p className="text-light">
                <img src="/image/add.png" alt="add-game" width="50" height="50" className="mr-3"/>
                Your articles
              </p>
            </a>
            <a href="editAccount.html">
              <p className="text-light">
                <img src="/image/edit.png" alt="edit-account" width="50" height="50" className="mr-3"/>
                Edit Profile
              </p>
            </a>
            <a href="">
              <p className="text-light">
                <img src="/image/logout.png" alt="logout" width="50" height="50" className="mr-3"/>
                Logout
              </p>
            </a>
          </div>
          <div className="col-8 justify-content-center">
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
        </div>
      </div>
    );
  }
}

export default UserPage;
