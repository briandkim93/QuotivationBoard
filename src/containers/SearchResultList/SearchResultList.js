import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchResultList.css';

import SearchResultItem from '../SearchResultItem/SearchResultItem';

import { setDisplayLoader } from '../../actions/index';

class SearchResultList extends Component {
  renderList() {
    const SearchResultItems = this.props.filteredSearchResults.map(
      result => <SearchResultItem key={result} term={result} />
    );
    return SearchResultItems;
  }
  componentDidUpdate() {
    if (this.props.filteredSearchResults.length > 0) {
      this.props.setDisplayLoader(false);
    }
  }
  render() {
    if (this.props.filteredSearchResults.length > 0) {
      return <ul className="search-result-list">{this.renderList()}</ul>;
    }
    if (this.props.displayLoader) {
      return <div className="loader"></div>;
    }
    return <ul className="search-result-list"></ul>;
  }
}

function mapStateToProps({filteredSearchResults, displayLoader}) {
  return {filteredSearchResults, displayLoader};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setDisplayLoader}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList);