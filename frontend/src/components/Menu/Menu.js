import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Menu.css';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultList from '../SearchResultList/SearchResultList';
import FollowingList from '../FollowingList/FollowingList';
import { closeMenu, toggleMenu } from '../../actions/index';

class Menu extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.displaySignup !== prevProps.displaySignup || this.props.displayLogin !== prevProps.displayLogin) {
      if (this.props.displaySignup || this.props.displayLogin) {
        this.props.closeMenu();
      }
    }
  }

  render() {
    return (
      <div>
        <div className={`menu ${!this.props.displayMenu ? 'side-menu-hidden' : ''}`}>
          <Header />
          <div className='menu-main'>
            <div className={!this.props.displayMenu ? 'top-menu-hidden' : ''}>
              <SearchBar />
              <SearchResultList />
              <FollowingList />
            </div>
          </div>
        </div>
        <div 
          className={`menu-slider ${!this.props.displayMenu ? 'side-menu-hidden' : ''}`}
          onClick={() => this.props.toggleMenu()}
        >
          <img 
            src={`/images/decorators/${this.props.displayMenu ? 'right-pointer.png' : 'left-pointer.png'}`} 
            alt="Menu Toggle Button" 
          /> 
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    displaySignup: state.displaySignup,
    displayLogin: state.displayLogin,
    displayPasswordResetRequest: state.displayPasswordResetRequest,
    displayMenu: state.displayMenu
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeMenu: closeMenu,
    toggleMenu: toggleMenu
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);