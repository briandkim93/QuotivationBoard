import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchResultItem from '../SearchResultItem/SearchResultItem';

class SearchResultList extends Component {
  renderList() {
    const SearchResultItems = this.props.filteredSearchResults.map(
      result => <SearchResultItem key={result} term={result} />
    );
    return SearchResultItems;
  }
  render() {
    return (
      <ul>
        {this.props.filteredSearchResults.length > 0 ? this.renderList() : '...Loading'}
      </ul>
    );
  }
}

function mapStateToProps({filteredSearchResults}) {
  return {filteredSearchResults};
}

export default connect(mapStateToProps)(SearchResultList);