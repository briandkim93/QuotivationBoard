import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Heading from '../../components/Heading/Heading';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultList from '../SearchResultList/SearchResultList';
import FollowingList from '../FollowingList/FollowingList';

import { toggleSidePanel } from '../../actions/index';

import rightPointer from './images/right-pointer.png';
import leftPointer from './images/left-pointer.png';
import './SidePanel.css';

class SidePanel extends Component {
  render() {
    return (
      <div className={`side-panel ${this.props.sidePanelStatus === 'active' ? 'active' : 'hidden'}`}>
        <Heading />
        <SearchBar />
        <SearchResultList />
        <FollowingList />
        <div 
          className={`slider ${this.props.sidePanelStatus === 'active' ? 'active' : 'hidden'}`}
          onClick={() => this.props.toggleSidePanel()}
        >
          {this.props.sidePanelStatus === 'active' ? <img src={rightPointer} /> : <img src={leftPointer} /> }
        </div>
      </div>
    );
  }
};

function mapStateToProps({sidePanelStatus}) {
  return {sidePanelStatus};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleSidePanel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);