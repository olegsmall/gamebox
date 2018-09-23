import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App/App';
import {BrowserRouter} from 'react-router-dom'; //don't need to specify localhost url in axios http address

ReactDom.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

// setTimeout(()=>{
//   ReactDom.render(
//     <h2>......</h2>,
//     document.getElementById('root')
//   );
// }, 4000);
