import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './QuotivationBoard.css';
import { changeQuote, closeMenu } from '../../actions';
import { toggleSignup, closeSignup, toggleLogin, closeLogin, closePasswordResetRequest, logout } from '../../actions/authentication';

class QuotivationBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoader: false
    };

    this.handleToggleSignup = this.handleToggleSignup.bind(this);
    this.handleToggleLogin = this.handleToggleLogin.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.renderQuoteBoard = this.renderQuoteBoard.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEsc, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.refreshTokenStatus !== prevProps.refreshTokenStatus && this.props.token) {
      if (this.props.refreshTokenStatus.status === 200) {
        this.props.getSources(this.props.token);
      }
    }
    if (this.props.token !== prevProps.token && this.props.token) {
        this.setState({
          displayLoader: true
      }); 
    }
    if (this.props.sourcesStatus !== prevProps.sourcesStatus) {
      setTimeout(() => {
        this.setState({
          displayLoader: false
        }); 
      }, 1000);
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

  getBoardType(sources) {
    if (sources.length === 0) {
      return 'empty-quotivation-board';
    } else if (sources.length === 1) {
      return 'singular-quotivation-board';
    } else {
      return 'assorted-quotivation-board';
    }
  }

  handleQuoteChange(source) {
    this.props.changeQuote(source, this.props.token);
  }

  renderQuotes(sources) {
    const quotesHTML = sources.map((source, index) => {
      const quoteWords = source.quote.split(' ');
      const lastWord = quoteWords.pop();
      const poppedQuoteText = quoteWords.join(' ');
      return (
        <li className={`quotivation-board-item bg-img-${index % 10}`} key={`source-${index}`}>
          <div className="quote">
            <div>
              {poppedQuoteText}&nbsp;
              <div className="quote-trailer">
                <div className="quote-last-word">
                  {lastWord}
                </div>
                <div className="quote-change-button" onClick={() => this.handleQuoteChange(source)}>
                  &nbsp;&#10149;
                </div>
              </div>
            </div>
            <div className="quote-source">
              -{source.author}
            </div>
          </div>
        </li>
        );
    });
    return quotesHTML;
  }

  renderQuoteBoard(boardType) {
    if (boardType === 'empty-quotivation-board') {
      return (
        <div className={`no-sources-message ${this.props.displaySignup || this.props.displayLogin || this.props.displayPasswordResetRequest ? 'no-sources-message-hidden' : ''}`}>
          Add A
          <br/>
          Source
          <br/>
          To Begin
        </div>
      );
    } else if (boardType === 'singular-quotivation-board') {
      return this.renderQuotes(this.props.sources)[0];
    } else if (boardType === 'assorted-quotivation-board') {
      return this.renderQuotes(this.props.sources);
    }
  }

  render() {
    return (
      <ul 
        className={`quotivation-board ${this.getBoardType(this.props.sources)} ${this.props.displaySignup || this.props.displayLogin || this.props.displayPasswordResetRequest ? 'quotivation-board-dimmed' : ''}`}
        onClick={this.props.closeMenu}
      >
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
        {this.state.displayLoader
          ? <div className="loader loader-lg quotivation-board-loader" />
          : this.renderQuoteBoard(this.getBoardType(this.props.sources))
        }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    displaySignup: state.displaySignup,
    displayLogin: state.displayLogin,
    displayPasswordResetRequest: state.displayPasswordResetRequest,
    sources: state.sources,
    sourcesStatus: state.sourcesStatus,
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
    closeMenu: closeMenu,
    changeQuote: changeQuote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotivationBoard);