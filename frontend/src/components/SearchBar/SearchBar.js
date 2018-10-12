import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchBar.css';
import { clearSearchResults, getSearchResults } from '../../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoader: false,
      searchTimeout: 0,
      query: ''
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResults !== prevProps.searchResults) {
      this.setState({
        displayLoader: false
      });
      if (this.props.searchResults.length === 0) {
        this.setState({
          query: ''
        });
      }
    }
    if (this.props.displayMenu !== prevProps.displayMenu) {
      if (!this.props.displayMenu) {
        this.setState({
          query: ''
        });
        this.props.clearSearchResults();
      }
    }
  } 

  handleSearchTermChange(event) {
    const query = event.target.value;
    if (query === '') {
      this.setState({
        displayLoader: false
      });
      clearTimeout(this.state.searchTimeout);
    }
    if (this.state.searchTimeout) {
      clearTimeout(this.state.searchTimeout);
    }
    this.setState({
      displayLoader: true,
      query: query,
      searchTimeout: setTimeout(() => {
        this.props.getSearchResults(query)
      }, 1000)
    });
  }

  render() {
    return (
      <div className="search-bar">
        <input 
          className="search-bar-input" 
          placeholder="Search" 
          value={this.state.query}
          onChange={this.handleSearchTermChange} 
        />
        <div className="search-bar-icon-container">
          {this.state.displayLoader 
            ? <div className="loader" /> 
            : <img className="search-bar-icon" src="/images/decorators/search-icon.png" alt="Search Icon" />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    displayMenu: state.displayMenu,
    searchResults: state.searchResults
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSearchResults: clearSearchResults,
    getSearchResults: getSearchResults
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);