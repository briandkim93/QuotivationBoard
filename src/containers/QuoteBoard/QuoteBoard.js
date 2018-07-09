import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import QuoteBoardItem from '../QuoteBoardItem/QuoteBoardItem';

import {fetchQuotes} from '../../actions/index';

class QuoteBoard extends Component {
  renderList() {
    const quotesObjectList = this.props.quotes.map(
      quoteObject => 
        <QuoteBoardItem 
          key={quoteObject.title}
          quoteObject={quoteObject}
        />
    );
    return quotesObjectList;
  }
  updateList(quoteObjectList) {
    const date = new Date();
    for (let i = 0; i < quoteObjectList.length; i += 1) {
      if (quoteObjectList[i].dateSet !== date.toLocaleDateString()) {
        quoteObjectList[i].current < quoteObjectList[i].total ? quoteObjectList[i].current += 1 : quoteObjectList[i].current = 0;
        quoteObjectList[i].dateSet = date.toLocaleDateString()
      }
    }
    return;
  }
  render() {
    this.updateList(this.props.quotes);
    return (
      <div className="quote-board col-8">
        {this.props.quotes.length > 0 ? this.renderList() : ''}
      </div>
    );
  }
}

function mapStateToProps({quotes}) {
  return {quotes};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchQuotes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteBoard);