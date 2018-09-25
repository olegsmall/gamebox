import React from 'react';

require('./UserPage.scss');

class UserPage extends React.Component {

  render() {
    return (
      <div className={'UserPage'}>
        <div id="hi-bg" className="alert alert-secondary h3 text-light" role="alert">
          <div className="container">Hi, Johnathan</div>
        </div>
        <div id="member" className="container mt-2">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h3 className="text-center text-light mb-5">Your account</h3>
              <div className="row">
                <div className="col-sm-6">
                  <a href="">
                    <p className="text-light">
                      <img src="/image/history.png" alt="orders" width="50" height="50" className="mr-3"/>
                      Your order's history
                    </p>
                  </a>
                  <a href="">
                    <p className="text-light">
                      <img src="/image/list.png" alt="games-list" width="50" height="50" className="mr-3"/>
                      Your games' list
                    </p>
                  </a>
                  <a href="">
                    <p className="text-light">
                      <img src="/image/add.png" alt="add-game" width="50" height="50" className="mr-3"/>
                      Add game for sale, rent
                    </p>
                  </a>
                  <a href="editAccount.html">
                    <p className="text-light">
                      <img src="/image/edit.png" alt="edit-account" width="50" height="50" className="mr-3"/>
                      Edit your account details
                    </p>
                  </a>
                  <a href="editAccount.html">
                    <p className="text-light">
                      <img src="/image/edit.png" alt="edit-account" width="50" height="50" className="mr-3"/>
                      Edit your account details
                    </p>
                  </a>
                  <a href="">
                    <p className="text-light">
                      <img src="/image/logout.png" alt="logout" width="50" height="50" className="mr-3"/>
                      Logout
                    </p>
                  </a>
                </div>
                <div className="col-sm-6">
                  <h5 className="text-light">Johnathan's account</h5>
                  <p className="text-light">
                    Avatar
                    <img src="/image/img_avatar.png" alt="avatar" width="100" height="100" className="ml-3"/>
                    <a href="#">
                      <span className="text-light ml-2">[ edit ]</span>
                    </a>
                  </p>
                  <p className="text-light">First name : Johnathan</p>
                  <p className="text-light">Last Name : Wendel</p>
                  <p className="text-light">Email address : wendel@gmail.com</p>
                  <p className="text-light">Rating :
                    <i className=" ml-3 fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
