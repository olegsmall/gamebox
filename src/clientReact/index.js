/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: index.js, Main application file
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App/App';
import {MemoryRouter} from 'react-router-dom';

/**
 * Rendering Application to the DOM
 */
ReactDom.render(
  <MemoryRouter>
    <App/>
  </MemoryRouter>,
  document.getElementById('root')
);

