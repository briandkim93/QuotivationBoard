import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { removeSource } from '../../actions';

class FollowingListItem extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveSource = this.handleRemoveSource.bind(this);
  }

  handleRemoveSource() {
    const sourceId = this.props.sources.filter(source => source.quoteset === this.props.authorId)[0].id;
    this.props.removeSource(sourceId, this.props.token)
  }

  render() {
    return (
      <li className="following-list-item">
        <span className="following-title">{this.props.authorName}</span>
        <span className="close-button" onClick={this.handleRemoveSource}>x</span>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources,
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeSource: removeSource
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingListItem);