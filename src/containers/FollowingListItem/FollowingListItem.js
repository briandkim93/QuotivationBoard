import React, { Component } from 'react';

class FollowingListItem extends Component {
  render() {
    return (
      <li className="following-list-item">
        {this.props.title}
        <span className="close-button">x</span>
      </li>
    );
  }
}

export default FollowingListItem;