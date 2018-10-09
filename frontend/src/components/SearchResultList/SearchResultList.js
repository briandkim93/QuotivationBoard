import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchResultList.css';
import { toggleSignup } from '../../actions/authentication';
import { addSource, clearSearchResults } from '../../actions/';

class SearchResultList extends Component {
  handleSearchResultSelect(authorId) {
    if (this.props.token) {
      this.props.addSource(authorId, this.props.token);
    } else {
      this.props.toggleSignup();
    }
    this.props.clearSearchResults();
  }

  renderList(searchResults) {
    if (searchResults[0].id === null) { 
      return (
        <li className="search-result-list-item search-result-list-warning">
          No Results Found
        </li>
      );
    }
    const searchResultsHTML = searchResults.map((searchResult, index) => (
      <li className="search-result-list-item" onClick={() => this.handleSearchResultSelect(searchResult.id)} key={`search-result-${index}`}>
        <span className="search-result-author-name">{searchResult.name}</span>
        <span className="search-result-add-button">+</span>
      </li>
    ));
    return searchResultsHTML;
  }

  render() {
    if (this.props.searchResults.length > 0) {
      return (
        <ul className="search-result-list">
          {this.renderList(this.props.searchResults)}
          <li 
            className="search-result-list-item search-result-clear-button"
            onClick={this.props.clearSearchResults}
          >
            <img src="/images/decorators/up-pointer.png" alt='Search Results Toggle Button' />
          </li>
        </ul>
      );
    }
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList);