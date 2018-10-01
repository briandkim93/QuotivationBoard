import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { removeSource } from '../../actions/index.js';

class FollowingListItem extends Component {
  render() {
    return (
      <li className="following-list-item">
        <span className="following-title">{this.props.title}</span>
        <span className="close-button" onClick={() => this.props.removeSource(this.props.title)}>x</span>
      </li>
    );
  }
}

function mapDispacthToProps(dispatch) {
  return bindActionCreators({removeSource}, dispatch);
}

export default connect(null, mapDispacthToProps)(FollowingListItem);