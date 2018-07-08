import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchQuotes } from '../../actions/index';
import { clearSearchResults } from '../../actions/index';

class SearchResultItem extends Component {
  constructor(props) {
    super(props);
    
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick() {
    this.props.fetchQuotes(this.props.term);
    this.props.clearSearchResults();
  }
  render() {
    return (
      <li onClick={this.handleItemClick}>
        {this.props.term}
      </li>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchQuotes, clearSearchResults}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchResultItem);
