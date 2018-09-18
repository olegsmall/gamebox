import React from 'react';

class LoginPage extends React.Component{

  render(){
    return (
      <div id="login" className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center text-light">Log in</h3>
            <form className="mt-3">
              <div className="form-group">
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-warning btn-block mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
