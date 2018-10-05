import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './QuotivationBoard.css';
import QuotivationBoardItem from '../QuotivationBoardItem/QuotivationBoardItem';
import { getQuotes } from '../../actions';
import { toggleSignup, closeSignup, toggleLogin, closeLogin, closePasswordResetRequest, logout } from '../../actions/authentication';

class QuotivationBoard extends Component {
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

  componentDidUpdate(prevProps) {
    if (this.props.refreshTokenStatus !== prevProps.refreshTokenStatus) {
      if (this.props.refreshTokenStatus.status === 200) {
        this.props.getQuotes(this.props.sources, this.props.token);
      }
    }
    if (this.props.sources !== prevProps.sources) {
      this.props.getQuotes(this.props.sources, this.props.token);
    }
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

  renderList() {
    const quotesHTML = this.props.quotes.map(
      (quoteInfo, index) => 
        <QuotivationBoardItem 
          key={`quote-${index}`}
          backgroundImageId={index % 10}
          quoteInfo={quoteInfo}
        />
    );
    return quotesHTML;
  }

  render() {
    if (this.props.quotes.length === 0) {
      return (
        <div className="empty-quote-board">
          {this.props.token
            ? (
              <div className="auth-bar">
                <span>{this.props.userInfo.provider !== 'facebook' && <Link className="auth-link" to='/account/settings'>Account</Link>}</span>
                <span onClick={this.handleLogout}><Link className="auth-link" to='/'>Logout</Link></span>
              </div>
            )
            : (
              <div className="auth-bar">
                <span className="auth-link" onClick={this.handleToggleSignup}>Sign Up</span>
                <span className="auth-link" onClick={this.handleToggleLogin}>Login</span>
              </div>
            )
          }
          <p>
            Add A
            <br/>
            Source
            <br/>
            To Begin
          </p>
        </div>
      );
    } else if (this.props.quotes.length === 1) {
      return (
        <div className="singular-quote-board">
          <ul>
            {this.props.token
              ? (
                <div className="auth-bar">
                  <span>{this.props.userInfo.provider !== 'facebook' && <Link className="auth-link" to='/account/settings'>Account</Link>}</span>
                  <span onClick={this.handleLogout}><Link className="auth-link" to='/'>Logout</Link></span>
                </div>
              )
              : (
                <div className="auth-bar">
                  <span className="auth-link" onClick={this.handleToggleSignup}>Sign Up</span>
                  <span className="auth-link" onClick={this.handleToggleLogin}>Login</span>
                </div>
              )
            }
            <QuotivationBoardItem 
              quoteInfo={this.props.quotes[0]}
            />
          </ul>
        </div>
      );
    } else {
      return (
        <div className="quote-board">
          {this.props.token
            ? (
              <div className="auth-bar">
                <span>{this.props.userInfo.provider !== 'facebook' && <Link className="auth-link" to='/account/settings'>Account</Link>}</span>
                <span onClick={this.handleLogout}><Link className="auth-link" to='/'>Logout</Link></span>
              </div>
            )
            : (
              <div className="auth-bar">
                <span className="auth-link" onClick={this.handleToggleSignup}>Sign Up</span>
                <span className="auth-link" onClick={this.handleToggleLogin}>Login</span>
              </div>
            )
          }
          <ul>
            {this.renderList()}
          </ul>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.quotes,
    sources: state.sources,
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
    getQuotes: getQuotes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotivationBoard);