import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';
import { toggleMenu } from '../../actions/index'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to='/'>
          <img className="header-logo" src='/images/logo.png' alt="QuotivationBoard Logo" />
        </Link>
        <div className="header-title">
          <h5>
            QuotivationBoard
          </h5>
          <div className="header-info">
            Quotes Refreshed Daily
          </div>
        </div>
        <div className='header-menu-button' onClick={this.props.toggleMenu}>
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    displayMenu: state.displayMenu
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleMenu: toggleMenu
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);