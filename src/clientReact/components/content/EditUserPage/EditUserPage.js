import React from 'react';
import axios from "axios/index";

require('./EditUserPage.scss');

class EditUserPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  };

  componentDidMount(){
    axios.get('/edit')
      .then((res) => {
        this.setState({});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={'EditUserPage'}>
        <div id="hi-bg" className="alert alert-secondary h3 text-light" role="alert">
          <div className="container">
            Hi, Johnathan
          </div>
        </div>
        <div className="container mt-2 mb-3">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="text-center text-light mb-5">
                Your account [ edit ]
              </h3>
              <div className="row">
                <div className="col-md-12">
                  <p className="text-light">
                    Your info [ edit ]
                  </p>
                  <form className="mt-3"
                        method="post"
                        action="#">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input type="text"
                               className="form-control form-control-sm"
                               id="inputName"
                               placeholder="First Name"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input type="text"
                               className="form-control form-control-sm"
                               id="inputSurname"
                               placeholder="Last Name"/>
                      </div>
                      <div className="form-group col-md-6">
                        <input type="email"
                               className="form-control form-control-sm"
                               id="inputEmail"
                               placeholder="E-mail"/>
                      </div>
                      <div className="form-group col-md-6">
                        <input type="text"
                               className="form-control form-control-sm"
                               id="inputPhoneNumber"
                               placeholder="Phone number"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text"
                             className="form-control form-control-sm"
                             id="inputAddress"
                             placeholder="Address"/>
                    </div>
                    <button type="submit"
                            className="btn btn-sm btn-block mb-3 buttonEditProfile">
                      Edit your info
                    </button>
                    <p className="text-light">
                      Your password [ edit ]
                    </p>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input type="password"
                               className="form-control form-control-sm"
                               id="inputPassword"
                               placeholder="Your password"/>
                      </div>
                      <div className="form-group col-md-6">
                        <input type="password"
                               className="form-control form-control-sm"
                               id="inputConfPassword"
                               placeholder="Your new password"/>
                      </div>
                      <button type="submit"
                              className="btn btn-sm btn-block buttonEditProfile">
                        Edit your password
                      </button>
                      <a href="member.html"
                         className="btn btn-sm btn-block buttonEditClose">
                        Close
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUserPage;