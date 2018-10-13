import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import QuotivationBoard from '../QuotivationBoard/QuotivationBoard';
import AccountSettings from '../Authentication/AccountSettings/AccountSettings';
import EmailVerify from '../Authentication/EmailVerify/EmailVerify';
import PasswordReset from '../Authentication/PasswordReset/PasswordReset';
import PageNotFound from '../PageNotFound/PageNotFound';
import { closeMenu } from '../../actions';
import { toggleSignup, closeSignup, toggleLogin, closeLogin, closePasswordResetRequest, logout } from '../../actions/authentication';


class Main extends Component {
  constructor(props) {
    super(props);

    this.handleToggleSignup = this.handleToggleSignup.bind(this);
    this.handleToggleLogin = this.handleToggleLogin.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEsc, false);
  }

  handleToggleSignup() {
    this.props.toggleSignup();
    this.props.closeLogin();
    this.props.closePasswordResetRequest();
  }

  handleToggleLogin() {
    this.props.toggleLogin();
    this.props.closeSignup();
    this.props.closePasswordResetRequest();
  }

  handleEsc(event) {
    if (event.keyCode === 27) {
      this.props.closeLogin();
      this.props.closeSignup();
      this.props.closePasswordResetRequest();
      this.props.closeMenu();
    }
  }

  handleLogout() {
    this.props.logout(this.props.token);
    if (this.props.userInfo.provider === 'facebook' || this.props.userInfo.provider === 'facebook-local') {
      window.FB.logout(function(response) {
        return;
      });
    }
  }

  render() {
    return (
      <div className="main-container">
        {this.props.token
          ? (
            <div className="authentication-bar">
              <span>{this.props.userInfo.provider !== 'facebook' && <Link className="authentication-link" to='/account/settings'>Account</Link>}</span>
              <span onClick={this.handleLogout}><Link className="authentication-link" to='/'>Logout</Link></span>
            </div>
          )
          : (
            <div className="authentication-bar">
              <span className="authentication-link" onClick={this.handleToggleSignup}>Sign Up</span>
              <span className="authentication-link" onClick={this.handleToggleLogin}>Login</span>
            </div>
          )
        }
        <div
          className={`main ${this.props.displayMenu || this.props.displaySignup || this.props.displayLogin || this.props.displayPasswordResetRequest ? 'main-dimmed' : ''}`}
          onClick={this.props.closeMenu}
        >
          <Switch>
            <Route exact path='/' component={QuotivationBoard} />
            <Route path='/account/settings' component={AccountSettings} />
            <Route path='/verify/:email_verification_code' component={EmailVerify} />
            <Route path='/reset/:uid/:token' component={PasswordReset} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    displaySignup: state.displaySignup,
    displayLogin: state.displayLogin,
    displayPasswordResetRequest: state.displayPasswordResetRequest,
    displayMenu: state.displayMenu,
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSignup: toggleSignup,
    closeSignup: closeSignup,
    toggleLogin: toggleLogin,
    closeLogin: closeLogin,
    closePasswordResetRequest: closePasswordResetRequest,
    logout: logout,
    closeMenu: closeMenu
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));