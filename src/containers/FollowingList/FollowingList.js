import React, { Component } from 'react';
import { connect } from 'react-redux';

class FollowingList extends Component {
  renderList() {
    return this.props.quotes.map(quotes => <li key={quotes.title}>{quotes.title}</li>)
  }
  render() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps({quotes}) {
  return {quotes};
}

export default connect(mapStateToProps)(FollowingList);