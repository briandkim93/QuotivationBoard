import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSearchResults } from '../../actions/index';
import { filterSearchResults } from '../../actions/index';
import { clearSearchResults } from '../../actions/index';
import { setDisplayLoader } from '../../actions/index';

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
      this.props.setDisplayLoader(true);
    }
  }
  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input value={this.state.query} onChange={this.handleOnInputChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSearchResults, filterSearchResults, clearSearchResults, setDisplayLoader}, dispatch);
}

function mapStateToProps({searchResults, filteredSearchResults}) {
  return {searchResults, filteredSearchResults};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);