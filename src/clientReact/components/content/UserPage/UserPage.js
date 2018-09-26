import React from 'react';
import axios from "axios";
import Profile from "./Profile/Profile";
import Products from "./Products/Products";
import Orders from "./Orders/Orders";
import EditProfile from "./EditProfile/EditProfile";
import Articles from "./Articles/Articles";

require('./UserPage.scss');

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      innerComponent: 'Profile',
    };
  }

  componentDidMount() {
    axios.get('/user/')
      .then((res) => {
        console.log(res.data);
        this.setState({user: res.data.user});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeInnerComponent(e, innerName){
    e.preventDefault();
    this.setState({innerComponent: innerName});
  }

  goToProfile(e){
    e.preventDefault();
    this.setState({innerComponent: 'Profile'});
  }

  render() {

    const firstName = (this.state.user !== null) ? this.state.user.firstName : '';
    const lastName = (this.state.user !== null) ? this.state.user.lastName : '';

    let inner = '';
    switch (this.state.innerComponent) {
      case 'Profile':
        inner = <Profile user={this.state.user}/>;
        break;
      case 'Products':
        inner = <Products/>;
        break;
      case 'Orders':
        inner = <Orders/>;
        break;
      case 'EditProfile':
        inner = <EditProfile goToProfile={this.goToProfile.bind(this)}/>;
        break;
      case 'Articles':
        inner = <Articles/>;
        break;
      default :
        inner = <Profile user={this.state.user}/>;
    }

    return (
      <div className={'UserPage'}>
        <div id="hi-bg" className="alert alert-secondary h3 text-light" role="alert">
          <div className={'container'}>Hi, {firstName + ' ' + lastName}</div>
        </div>

        <div className="container d-flex flex-row mt-5">
          <div className="col-4">
            <a onClick={(e)=>this.changeInnerComponent(e, 'Profile')} href="">
              <p className="text-light">
                <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                Profile
              </p>
            </a>
            <a onClick={(e)=>this.changeInnerComponent(e, 'Orders')} href="">
              <p className="text-light">
                <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                Your Orders
              </p>
            </a>
            <a onClick={(e)=>this.changeInnerComponent(e, 'Products')} href="">
              <p className="text-light">
                <img src="/image/list.png" alt="games-list" width="50" height="50" className="mr-3"/>
                Your games
              </p>
            </a>
            <a onClick={(e)=>this.changeInnerComponent(e, 'Articles')} href="">
              <p className="text-light">
                <img src="/image/add.png" alt="add-game" width="50" height="50" className="mr-3"/>
                Your articles
              </p>
            </a>
            <a onClick={(e)=>this.changeInnerComponent(e, 'EditProfile')} href={''}>
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
            {inner}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
