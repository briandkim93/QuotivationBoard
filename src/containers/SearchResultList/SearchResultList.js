import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchResultList.css';

import SearchResultItem from '../SearchResultItem/SearchResultItem';

class SearchResultList extends Component {
  renderList() {
    const SearchResultItems = this.props.filteredSearchResults.map(
      result => <SearchResultItem key={result} term={result} />
    );
    return SearchResultItems;
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