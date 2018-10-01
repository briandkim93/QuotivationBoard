import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Heading.css';
import logo from './images/qb-logo.png'

import { toggleSidePanel } from '../../actions/index'

class Heading extends Component {
  render() {
    return (
      <div className="heading">
        <img className="logo" src={logo} alt="QuotivationBoard Logo" />
        <span className="title">
          <h1>QuotivationBoard</h1>
        </span>
        <div           
          className='menu-button'
          onClick={this.props.toggleSidePanel}
        >
          <div></div>
          <div></div>
          <div></div>
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

export default connect(null, mapDispatchToProps)(Heading);