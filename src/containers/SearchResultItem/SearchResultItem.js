import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchQuotes } from '../../actions/index';

class SearchResultItem extends Component {
  render() {
    return (
      <li onClick={() => this.props.fetchQuotes(this.props.term)}>
        {this.props.term}
      </li>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchQuotes}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchResultItem);
