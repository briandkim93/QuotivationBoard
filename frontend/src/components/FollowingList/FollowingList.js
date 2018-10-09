import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './FollowingList.css';
import { getSources, removeSource } from '../../actions'


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
  }

  renderFollowingList(sources, token) {
    const followingListHTML = sources.map((source, index) => (
      <li className="following-list-item" key={`following-${index}`} >
        <div className="following-list-author-name">
          {source.author}
        </div>
        <div className="following-list-close-button" onClick={() => this.handleSourceRemoval(source.id, token)}>
          x
        </div>
      </li>
    ));
    return followingListHTML;
  }

  handleSourceRemoval(sourceId, token) {
    this.props.removeSource(sourceId, token)
  }

  render() {
    return (
      <ul className="following-list">
        <li className="following-list-title">
          Following
        </li>
        {!this.props.sources.length && 
          <li className="following-list-item following-list-warning">
            No Sources Added
          </li>
        }
        {this.renderFollowingList(this.props.sources, this.props.token)}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources,
    token: state.token
  };
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators({
    getSources: getSources,
    removeSource: removeSource
  }, dispatch);
}

export default connect(mapStateToProps, mapStateToDispatch)(FollowingList);