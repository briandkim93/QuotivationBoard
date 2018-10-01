import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSearchResults } from '../../actions/index';
import { filterSearchResults } from '../../actions/index';
import { clearSearchResults } from '../../actions/index';

import './SearchBar.css';
import searchButton from './images/search-button.png';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {query: ''};

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnInputChange(event) {
    this.setState({query: event.target.value});
    this.props.fetchSearchResults(event.target.value);
    if (this.props.filteredSearchResults) {
      this.props.clearSearchResults();
    }
  }
  handleOnSubmit(event) {
    event.preventDefault();
    this.setState({query: ''});
    if (this.state.query) {
      this.props.filterSearchResults(this.props.searchResults);
    }
  }
  render() {
    return (
      <form className="search-bar" onSubmit={this.handleOnSubmit}>
        <input 
          className="search-input" 
          placeholder="Search" 
          value={this.state.query} 
          onChange={this.handleOnInputChange} 
        />
        <button className="search-button" type="submit">
          <img src={searchButton} alt="Search Button" />
        </button>
      </form>
    );
  }
}

function mapStateToProps({searchResults, filteredSearchResults}) {
  return {searchResults, filteredSearchResults};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSearchResults, filterSearchResults, clearSearchResults}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);