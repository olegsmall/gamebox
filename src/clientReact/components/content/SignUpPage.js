import React from 'react';

class SignUpPage extends React.Component{

  render(){
    return (
      <div id="signUp" className="container">
        <div className="row justify-content-center">
          <form className="mt-5" method="post" action="#">
            <h3 className="text-center text-light mb-4">Create en account</h3>
            <div className="form-group">
              <input type="text" className="form-control text-center" id="inputName" placeholder="Enter your name"/>
            </div>
            <div className="form-group">
              <input type="email" className="form-control text-center" id="inputEmail" placeholder="Enter your e-mail"/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control text-center" id="inputUserName" placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control text-center" id="inputPassword" placeholder="Enter your password"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control text-center" id="inputConfPassword" placeholder="Confirm your password"/>
            </div>
            <button type="submit" className="btn btn-warning btn-block mt-3">Create your account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
