import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchResultList.css';

import SearchResultListItem from '../SearchResultListItem/SearchResultListItem';

class SearchResultList extends Component {
  renderList() {
    const SearchResultListItems = this.props.filteredSearchResults.map(
      result => <SearchResultListItem key={result} term={result} />
    );
    return SearchResultListItems;
  }
  render() {
    if (this.props.filteredSearchResults.length > 0) {
      return <ul className="search-result-list">{this.renderList()}</ul>;
    }
    return <ul className="search-result-list"></ul>;
  }
}

function mapStateToProps({filteredSearchResults}) {
  return {filteredSearchResults};
}

export default connect(mapStateToProps)(SearchResultList);