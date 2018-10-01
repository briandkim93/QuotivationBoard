import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchResultList.css';
import upPointer from './images/up-pointer.png';
import { clearSearchResults } from '../../actions/index';

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
      return (
        <ul className="search-result-list">
          {this.renderList()}
          <li 
            className="search-result-list-item clear-button"
            onClick={this.props.clearSearchResults}
          >
            <img src={upPointer} />
          </li>
        </ul>
      );
    }
    return <ul className="search-result-list"></ul>;
  }
}

function mapStateToProps({filteredSearchResults}) {
  return {filteredSearchResults};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({clearSearchResults}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList);