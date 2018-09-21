import React from 'react';

class MemberPage extends React.Component {

  render() {
    return (
      <div id="member" className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h3 className="text-center text-light mb-5 mt-5">Your account</h3>
            <div className="card mt-3">
              <div className="card-body">
                <a href="#">
                  <p className="card-text">
                    <img src="image/order.png/" alt="orders" width="50" height="50" className="mr-3"/>
                    Your orders
                  </p>
                </a>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <a href="#">
                  <p className="card-text">
                    <img src="image/name.png/" alt="name" width="50" height="50" className="mr-3"/>
                    dit your name
                  </p>
                </a>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <a href="#">
                  <p className="card-text">
                    <img src="image/pass.png/" alt="pass" width="50" height="50" className="mr-3"/>
                    Edit your password
                  </p>
                </a>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <a href="#">
                  <p className="card-text">
                    <img src="image/home.png/" alt="adress" width="50" height="50" className="mr-3"/>
                    Edit your address
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberPage;
