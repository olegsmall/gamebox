/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: UserPage.js, User component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import Profile from './Profile/Profile';
import Products from './Products/Products';
import Orders from './Orders/Orders';
import EditProfile from './EditProfile/EditProfile';
import Articles from './Articles/Articles';
import AddProduct from './AddProduct/AddProduct';
import AddArticle from './AddArticle/AddArticle';
import ChangePassword from './ChangePassword/ChangePassword';
import UserActivation from "./adminPages/UserActivation/UserActivation";
import UsersList from "./adminPages/UsersList/UsersList";
import PaymentConfirmation from "./adminPages/PaymentConfirmation/PaymentConfirmation";
import EditUserRights from "./adminPages/EditUserRights/EditUserRights";
import Messenger from "./Messenger/Messenger";
import Statistics from "./Statistics/Statistics";
import ProductRow from "./Products/ProductRow/ProductRow";

require('./UserPage.scss');

/**
 * Class UserPage, User component
 */
class UserPage extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
    this.state = {
      innerComponent: 'Profile',
      message: '',
      articleForEdit: null,
      productForEdit: null,
      userForEdit: null, // User for edit in admin part in page EditUserRights
    };
    this.handleChangeInner = this.handleChangeInner.bind(this);
    this.setUserForEditState = this.setUserForEditState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  //Update user edit status
  setUserForEditState(user) {
    this.setState({userForEdit: user});
  }

  //Update article status
  setArticleState(obj) {
    this.setState(obj);
  }

  //Update user status
  setUserPageState = (obj)=>{
    this.setState(obj);
  };

  //Processing click on different buttons
  handleChangeInner(e, innerName) {
    e.preventDefault();
    this.changeInner(innerName);
  }

  // User logout
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  //Change user sub-pages
  changeInner = (innerName)=> {
    this.setState({innerComponent: innerName});
  }

  //Show profile
  goToProfile(e) {
    e.preventDefault();
    this.setState({innerComponent: 'Profile'});
  }

  //Show message
  showMessage(message) {
    this.setState({message: message});
    setTimeout(() => this.setState({message: ''}), 5000);
  }

  //Add to DOM
  render() {

    const firstName = (this.props.user !== null) ? this.props.user.firstName : '';
    const lastName = (this.props.user !== null) ? this.props.user.lastName : '';

    let inner = '';
    switch (this.state.innerComponent) {
      case 'Profile':
        inner = <Profile
          changeInner={this.changeInner}
          user={this.props.user}/>;
        break;
      case 'Products':
        inner = <Products
          changeInner={this.changeInner}
          user={this.props.user}
          setUserPageState={this.setUserPageState}
        />;
        break;
      case 'AddProduct':
        inner = <AddProduct
          showSystemMessage={this.props.showSystemMessage}
          changeInner={this.changeInner}
          pageType={'AddProduct'}
        />;
        break;
      case 'EditProduct':
        inner = <AddProduct
          showSystemMessage={this.props.showSystemMessage}
          changeInner={this.changeInner}
          pageType={'EditProduct'}
          product={this.state.productForEdit}
        />;
        break;
      case 'Orders':
        inner = <Orders/>;
        break;
      case 'EditProfile':
        inner = <EditProfile
          user={this.props.user}
          changeInner={this.changeInner}
          goToProfile={this.goToProfile.bind(this)}
          showSystemMessage={this.props.showSystemMessage}
          updateUser={this.props.updateUser}
        />;
        break;
      case 'ChangePassword':
        inner = <ChangePassword
          user={this.props.user}
          changeInner={this.changeInner}
          goToProfile={this.goToProfile.bind(this)}
          showSystemMessage={this.props.showSystemMessage}
        />;
        break;
      case 'Articles':
        inner = <Articles
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
          setArticleState={this.setUserPageState}
          user={this.props.user}/>;
        break;
      case 'AddArticle':
        inner = <AddArticle
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
          pageType={'AddArticle'}
        />;
        break;
      case 'EditArticle':
        inner = <AddArticle
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
          pageType={'EditArticle'}
          article={this.state.articleForEdit}
        />;
        break;
      case 'UserActivation':
        inner = <UserActivation
          showSystemMessage={this.props.showSystemMessage}
        />;
        break;
      case 'UsersList':
        inner = <UsersList
          changeInner={this.changeInner}
          setUserForEditState={this.setUserForEditState.bind(this)}
          showSystemMessage={this.props.showSystemMessage}
        />;
        break;
      case 'EditUserRights':
        inner = <EditUserRights
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
          userForEdit={this.state.userForEdit}
        />;
        break;
      case 'PaymentConfirmation':
        inner = <PaymentConfirmation
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
        />;
        break;
      case 'Messenger':
        inner = <Messenger
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
        />;
        break;
      case 'Statistics':
        inner = <Statistics
          changeInner={this.changeInner}
          showSystemMessage={this.props.showSystemMessage}
        />;
        break;
      default :
        inner = <Profile user={this.props.user}/>;
    }

    return (
      <div className={'UserPage'}>
        <div className="imageMain">
          <img className="d-block w-100 imgMain" src="image/back6.jpg" alt="Main image"/>
        </div>
        <h5 className="pt-4 mt-2 ml-5">Hi, {firstName + ' ' + lastName}</h5>
        <div>{this.state.message}</div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center">
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'Profile')}>
                Profile
              </button>
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'ChangePassword')}>
                Change password
              </button>
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'Statistics')}>
                Statistics
              </button>
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'Messenger')}>
                Messenger
              </button>
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'Orders')}>
                Your Orders
              </button>
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'Products')}>
                Your games
              </button>
              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'Articles')}>
                Your articles
              </button>

              {this.props.user.role === 'Administrator' || this.props.user.role === 'SuperUser'
                ? <div>
                  <span><strong>Administration:</strong></span>
                  <button className="mt-2  btn-block pr-3 pl-3"
                          onClick={(e) => this.handleChangeInner(e, 'UserActivation')}>
                    User activation
                  </button>
                  <button className="mt-2  btn-block pr-3 pl-3" onClick={(e) => this.handleChangeInner(e, 'UsersList')}>
                    Users list
                  </button>
                  <button className="mt-2  btn-block pr-3 pl-3"
                          onClick={(e) => this.handleChangeInner(e, 'PaymentConfirmation')}>
                    Payment confirmation
                  </button>
                </div>
                : ''}

              <button className="mt-2  btn-block pr-3 pl-3" onClick={(e)=>this.handleLogout(e)}>
                Logout
              </button>
            </div>
            {inner}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
