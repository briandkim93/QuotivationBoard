import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './SearchBar.css';
import { getSearchResults } from '../../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoader: false,
      query: ''
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResults !== prevProps.searchResults) {
      this.setState({
        displayLoader: false
      });
      if (!this.props.searchResults.length) {
        this.setState({
          query: ''
        });
      }
    }
  } 

  handleOnInputChange(event) {
    this.setState({
      displayLoader: true,
      query: event.target.value
    });
    this.props.getSearchResults(event.target.value);
  }

  render() {
    return (
      <div className="search-bar">
        <input 
          className="search-input" 
          placeholder="Search" 
          value={this.state.query}
          onChange={this.handleOnInputChange} 
        />
        <div className="search-icon-container">
          {this.state.displayLoader ? <div className="loader" /> : <img className="search-icon" src="/images/decorators/search-icon.png" alt="Search Icon" />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getSearchResults}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);