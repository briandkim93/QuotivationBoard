import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleSignup } from '../../actions/authentication';
import { addSource, clearSearchResults } from '../../actions';

class SearchResultListItem extends Component {
  constructor(props) {
    super(props);
    
    this.handleSearchResultSelect = this.handleSearchResultSelect.bind(this);
  }

  handleSearchResultSelect() {
    if (this.props.token) {
      this.props.addSource(this.props.authorId, this.props.token);
    } else {
      this.props.toggleSignup();
    }
    this.props.clearSearchResults();
  }

  render() {
    if (this.props.authorName === 'No Results Found') { 
      return <li className="search-result-list-item">{this.props.authorName}</li>;
    } else {
      return (
        <li className="search-result-list-item" onClick={this.handleSearchResultSelect}>
          <span className="search-result-title">{this.props.authorName}</span>
          <span className="add-button">+</span>
        </li>
      );
    }
  }
};

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSource: addSource, 
    clearSearchResults: clearSearchResults,
    toggleSignup: toggleSignup
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultListItem);
