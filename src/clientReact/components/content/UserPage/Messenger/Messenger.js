/**
 * Messanger component
 *
 * file: Messanger.js
 * Created by: Oleg Smolovyk.
 * Date: 10/11/2018
 * Time: 15:56
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./Messenger.scss');

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  getMessages() {

  }

  render() {

    return (
      <div className="col-md-8 text-center">
        <div className="h5 ml-5 mb-2 text-center text-sm-left">My messenger</div>
        <form className="row">
          <div className="col-md-9 mt-3">
            <label className="sr-only" htmlFor="emailFormInput"></label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="email" className="form-control" id="emailFormInput" placeholder="email"/>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="submit" className="btn btn-block">send</button>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="inputMessageTitle"></label>
              <input type="text" className="form-control" id="inputMessageTitle" placeholder="message title"/>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
                        <textarea className="form-control" rows="5" aria-label="messagearea"
                                  placeholder="message text"></textarea>
            </div>
          </div>
        </form>
        <form>
          <div className="h5 ml-5 mb-2 mt-3 text-center text-sm-left">All my letters</div>
          <table className="table table-sm mt-3">
            <tr>
              <th scope="row"><a href="#"><img src="image/write-3722611_640_in.png" width="40"/></a></th>
              <td><a href="#">Mark</a></td>
              <td><a href="#">mark@gmail.com</a></td>
              <td><a href="#">salut</a></td>
            </tr>
            <tr>
              <th scope="row"><a href="#"><img src="image/write-3722611_640_out.png" width="40"/></a></th>
              <td><a href="#">Fred</a></td>
              <td><a href="#">fred@gmail.com</a></td>
              <td><a href="#">Hi</a></td>
            </tr>
            <tr className="table-active">
              <th scope="row"><a href="#"><img src="image/write-3722611_640_out.png" width="40"/></a></th>
              <td><a href="#">Svitlana</a></td>
              <td><a href="#">svitlana@gmail.com</a></td>
              <td><a href="#">Bla-bla-bla</a></td>
            </tr>
          </table>
          <div className="text_message_history"></div>
        </form>
      </div>
    );
  }
}

