import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSearchResults } from '../../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {query: ''};

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }
  handleOnInputChange(event) {
    this.setState({query: event.target.value});
    this.props.fetchSearchResults(event.target.value);
  }
  render() {
    return (
      <input value={this.state.query} onChange={this.handleOnInputChange} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSearchResults}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);