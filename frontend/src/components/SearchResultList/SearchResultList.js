import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchResultList.css';
import { clearSearchResults } from '../../actions/index';

import SearchResultListItem from '../SearchResultListItem/SearchResultListItem';

class SearchResultList extends Component {
  renderList() {
    const SearchResultListItems = this.props.searchResults.map(
      result => <SearchResultListItem key={`author-${result.id}`} authorName={result.name} authorId={result.id} />
    );
    return SearchResultListItems;
  }

  render() {
    if (this.props.searchResults.length > 0) {
      return (
        <ul className="search-result-list">
          {this.renderList()}
          <li 
            className="search-result-list-item clear-button"
            onClick={this.props.clearSearchResults}
          >
            <img src="/images/decorators/up-pointer.png" alt='Search Results Toggle Button' />
          </li>
        </ul>
      );
    }
    return <ul className="search-result-list"></ul>;
  }
}

function mapStateToProps({searchResults}) {
  return {searchResults};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({clearSearchResults}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList);