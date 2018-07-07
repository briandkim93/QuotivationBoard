import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchResultItem from '../SearchResultItem/SearchResultItem';

class SearchResultList extends Component {
  renderList() {
    const displayedResults = this.props.searchResults.map(
      searchResult => <SearchResultItem key={searchResult} term={searchResult} />
    ).slice(0, 5);
    return displayedResults;
  }
  render() {
    return (
      <ul>
        {Array.isArray(this.props.searchResults) ? this.renderList() : ''}
      </ul>
    );
  }
}

function mapStateToProps({searchResults}) {
  return {searchResults};
}

export default connect(mapStateToProps)(SearchResultList);