import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { refreshQuote } from '../../actions/index';

class QuoteBoardItem extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.refreshQuote(this.props.quoteObject);
  }
  render() {
    return (
      <li className="quote-board-item">
        {this.props.quoteObject.quoteList[this.props.quoteObject.current]}
        <p className="quote-source-row">
          <span className="refresh-button" onClick={this.handleOnClick}>Refresh</span>
          <span className="quote-source">-{this.props.quoteObject.title}</span>
        </p>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({refreshQuote}, dispatch);
}

export default connect(null, mapDispatchToProps)(QuoteBoardItem);