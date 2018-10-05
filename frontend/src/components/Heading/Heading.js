import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Heading.css';

import { toggleMenu } from '../../actions/index'

class Heading extends Component {
  render() {
    return (
      <div className="heading">
        <img className="logo" src='/images/logo.png' alt="QuotivationBoard Logo" />
        <span className="title">
          <h5>QuotivationBoard</h5>
        </span>
        <div           
          className='menu-button'
          onClick={this.props.toggleMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleMenu}, dispatch);
}

export default connect(null, mapDispatchToProps)(Heading);