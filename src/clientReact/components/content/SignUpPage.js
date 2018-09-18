import React from 'react';
import Axios from 'axios';

class SignUpPage extends React.Component{
  createUser(e){
    e.preventDefault();
    // debugger;
    Axios.post('/user/register', {
      username: document.getElementById('inputName').value,
      email: document.getElementById('inputEmail').value,
      password: document.getElementById('inputPassword').value,
      firstName: document.getElementById('inputUserName').value,
      lastName: document.getElementById('inputUserName').value,
      avatar: document.getElementById('inputName').value
    })
      .then((res)=>{
        console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  render(){
    return (
      <div id="signUpPage" className="container">
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
            <button className="btn btn-warning btn-block mt-3" onClick={this.createUser}>Create your account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
