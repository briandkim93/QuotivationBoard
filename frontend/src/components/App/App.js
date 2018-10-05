import React, { Component } from 'react';

import './App.css';
import Menu from '../Menu/Menu';
import QuoteRefresher from '../QuoteRefresher/QuoteRefresher';
import Signup from '../Authentication/Signup/Signup';
import Login from '../Authentication/Login/Login';
import FacebookLoginSDK from '../Authentication/FacebookLoginSDK/FacebookLoginSDK';
import PasswordResetRequest from '../Authentication/PasswordResetRequest/PasswordResetRequest';
import TokenRefresher from '../Authentication/TokenRefresher/TokenRefresher';
import Main from '../Main/Main';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Menu />
        <div className="container-fluid">
          <div className="col-12 position-relative">
            <Signup />
            <Login />
            <FacebookLoginSDK />
            <PasswordResetRequest />
            <TokenRefresher />
          </div>
        </div>
        <QuoteRefresher />
        <Main />
      </div>
    );
  }
}

export default App;