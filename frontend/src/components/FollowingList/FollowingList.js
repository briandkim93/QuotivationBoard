import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './FollowingList.css';
import FollowingListItem from '../FollowingListItem/FollowingListItem';
import { getSources, getFollowingList } from '../../actions'


class FollowingList extends Component {
  constructor(props) {
    super(props);
    if (this.props.token) {
      this.props.getSources(this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token && this.props.token) {
      this.props.getSources(this.props.token);
    }
    if (this.props.sources !== prevProps.sources) {
      this.props.getFollowingList(this.props.sources);
    }
  }

  renderFollowingList() {
    return this.props.followingList.map(author => <FollowingListItem key={`following-${author.id}`} authorName={author.name} authorId={author.id} />)
  }

  render() {
    return (
      <ul className="following-list">
        <li className="following-list-title">Following</li>
        {this.props.sources.length < 1 && <li className="following-list-warning">No Sources Added</li>}
        {this.renderFollowingList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    followingList: state.followingList,
    token: state.token,
    sources: state.sources
  };
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators({
    getSources: getSources,
    getFollowingList: getFollowingList
  }, dispatch);
}

export default connect(mapStateToProps, mapStateToDispatch)(FollowingList);