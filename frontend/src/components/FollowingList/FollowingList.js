import React, { Component } from 'react';
import { connect } from 'react-redux';

import FollowingListItem from '../FollowingListItem/FollowingListItem';

import './FollowingList.css';

class FollowingList extends Component {
  renderList() {
    return this.props.quotes.map(quotes => <FollowingListItem key={quotes.title} title={quotes.title} />)
  }
  render() {
    if (this.props.quotes.length < 1) {
      return (
        <ul className={`following-list ${this.props.sidePanelStatus === 'active' ? 'active' : 'hidden-menu'}`}>
          <li className="following-list-title">Following</li>
          <li className="following-list-warning">No Sources Added</li>
        </ul>
      );
    }
    return (
      <ul className={`following-list ${this.props.sidePanelStatus === 'active' ? 'active' : 'hidden-menu'}`}>
        <li className="following-list-title">Following</li>
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps({quotes, sidePanelStatus}) {
  return {quotes, sidePanelStatus};
}

export default connect(mapStateToProps)(FollowingList);