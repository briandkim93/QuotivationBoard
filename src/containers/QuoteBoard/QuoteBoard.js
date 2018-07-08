import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuoteBoard extends Component {
  render() {
    return (
      <div>
        {this.props.quotes && this.props.quotes.quoteList}
      </div>
    );
  }
}

function mapStateToProps({quotes}) {
  return {quotes};
}

export default connect(mapStateToProps)(QuoteBoard);