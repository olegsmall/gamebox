/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: MessageBox.js, Message box component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';

require('./MessageBox.scss');

/**
 * Class MessageBox, message box component
 */
export default class MessageBox extends React.Component {

  //Add to DOM
  render() {
    const {hideSystemMessage, systemMessage: {message = '', type = '', show = false} = {}} = this.props;

    const showHideClassName = show ? 'showMessage' : 'hideMessage';

    let messageImage = '';
    let alertClass = '';

    //switch for displaying different types of messages
    switch (type) {
      case 'warning':
        messageImage = '/image/warning.png';
        alertClass = 'alert-warning';
        break;
      case 'error':
        messageImage = '/image/error.png';
        alertClass = 'alert-danger';
        break;
      case 'success':
      default:
        messageImage = '/image/success.png';
        alertClass = 'alert-success';
    }

    return (
      <div className={`MessageBox ${showHideClassName}`}>
        <div className={"alert "} role="alert">
          <div className="">
            <img className="imgWindow mr-2" src={messageImage}/>
            <button type="button" className="close" onClick={hideSystemMessage}>
              <span className="span">&times;</span>
            </button>
            {message}
          </div>
        </div>
      </div>
    );
  }
}
