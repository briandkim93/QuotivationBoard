import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './App.css';
import Menu from '../Menu/Menu';
import Signup from '../Authentication/Signup/Signup';
import Login from '../Authentication/Login/Login';
import FacebookLoginSDK from '../Authentication/FacebookLoginSDK/FacebookLoginSDK';
import PasswordResetRequest from '../Authentication/PasswordResetRequest/PasswordResetRequest';
import TokenRefresher from '../Authentication/TokenRefresher/TokenRefresher';
import QuoteRefresher from '../QuoteRefresher/QuoteRefresher';
import Main from '../Main/Main';

class App extends Component {
  render() {
    return (
      <div className={`app ${this.props.location.pathname.includes('account') || this.props.location.pathname.includes('reset') || this.props.location.pathname.includes('verify') ? 'account-settings-min-width' : ''}`}>
        <Menu />
        <div className="position-relative">
          <Signup />
          <Login />
          <FacebookLoginSDK />
          <PasswordResetRequest />
          <TokenRefresher />
        </div>
        <QuoteRefresher />
        <Main />
      </div>
    );
  }
}

export default withRouter(App);