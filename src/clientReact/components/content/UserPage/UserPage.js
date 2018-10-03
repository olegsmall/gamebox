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

require('./UserPage.scss');

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      innerComponent: 'Profile',
      message: '',
    };
    this.handleChangeInner.bind(this);
  }

  componentDidMount() {
    // axios.get('/user/')
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setState({user: res.data.user});
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  handleChangeInner(e, innerName){
    e.preventDefault();
    this.changeInner(innerName);
  }
  changeInner(innerName){
    this.setState({innerComponent: innerName});
  }

  goToProfile(e){
    e.preventDefault();
    this.setState({innerComponent: 'Profile'});
  }

  showMessage(message){
    this.setState({message: message});
    setTimeout(()=>this.setState({message: ''}), 5000);
  }
  render() {

    const firstName = (this.props.user !== null) ? this.props.user.firstName : '';
    const lastName = (this.props.user !== null) ? this.props.user.lastName : '';

    let inner = '';
    switch (this.state.innerComponent) {
    case 'Profile':
      inner = <Profile
        changeInner={this.changeInner.bind(this)}
        user={this.props.user}/>;
      break;
    case 'Products':
      inner = <Products
        changeInner={this.changeInner.bind(this)}
        user={this.props.user}/>;
      break;
    case 'AddProduct':
      inner = <AddProduct/>;
      break;
    case 'Orders':
      inner = <Orders/>;
      break;
    case 'EditProfile':
      inner = <EditProfile
        user={this.props.user}
        changeInner={this.changeInner.bind(this)}
        goToProfile={this.goToProfile.bind(this)}
        showMessage={this.showMessage.bind(this)}/>;
      break;
    case 'ChangePassword':
      inner = <ChangePassword
        user={this.props.user}
        changeInner={this.changeInner.bind(this)}
        goToProfile={this.goToProfile.bind(this)}
        showMessage={this.showMessage.bind(this)}/>;
      break;
    case 'Articles':
      inner = <Articles
        changeInner={this.changeInner.bind(this)}
        user={this.props.user}/>;
      break;
    case 'AddArticle':
      inner = <AddArticle/>;
      break;
    default :
      inner = <Profile user={this.props.user}/>;
    }

    return (
      <div className={'UserPage'}>
        <div id="hi-bg" className="alert alert-secondary h3 text-light" role="alert">
          <div className={'container d-flex flex-row flex-nowrap justify-content-between'}>
            <div>Hi, {firstName + ' ' + lastName}</div>
            <div>{this.state.message}</div>
          </div>
        </div>

        <div className="container d-flex flex-row mt-5">
          <div className="col-4">
            <a onClick={(e)=>this.handleChangeInner(e, 'Profile')} href="">
              <p className="text-light">
                <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                Profile
              </p>
            </a>
            <a onClick={(e)=>this.handleChangeInner(e, 'ChangePassword')} href="">
              <p className="text-light">
                <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                Change password
              </p>
            </a>
            <a onClick={(e)=>this.handleChangeInner(e, 'Orders')} href="">
              <p className="text-light">
                <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                Your Orders
              </p>
            </a>
            <a onClick={(e)=>this.handleChangeInner(e, 'Products')} href="">
              <p className="text-light">
                <img src="/image/list.png" alt="games-list" width="50" height="50" className="mr-3"/>
                Your games
              </p>
            </a>
            <a onClick={(e)=>this.handleChangeInner(e, 'Articles')} href="">
              <p className="text-light">
                <img src="/image/add.png" alt="add-game" width="50" height="50" className="mr-3"/>
                Your articles
              </p>
            </a>
            {/*<a onClick={(e)=>this.handleChangeInner(e, 'EditProfile')} href={''}>*/}
            {/*<p className="text-light">*/}
            {/*<img src="/image/edit.png" alt="edit-account" width="50" height="50" className="mr-3"/>*/}
            {/*Edit Profile*/}
            {/*</p>*/}
            {/*</a>*/}
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
