import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Heading from '../Heading/Heading';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultList from '../SearchResultList/SearchResultList';
import FollowingList from '../FollowingList/FollowingList';

import './Menu.css';
import { toggleMenu } from '../../actions/index';

class Menu extends Component {
  render() {
    return (
      <div className={`menu ${this.props.displayMenu ? 'active' : 'side-menu-hidden'}`}>
        <Heading />
        <div className={this.props.displayMenu ? 'active' : 'top-menu-hidden'}>
          <SearchBar />
          <SearchResultList />
          <FollowingList />
        </div>
        <div 
          className={`slider ${this.props.displayMenu ? 'active' : 'side-menu-hidden'}`}
          onClick={() => this.props.toggleMenu()}
        >
          {this.props.displayMenu ? <img src="/images/decorators/right-pointer.png" alt="Menu Toggle Button" /> : <img src="/images/decorators/left-pointer.png" alt="Menu Toggle Button" /> }
        </div>
      </div>
    );
  }
};

function mapStateToProps({displayMenu}) {
  return {displayMenu};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleMenu}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);