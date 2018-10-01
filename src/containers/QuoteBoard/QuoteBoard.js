import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import './QuoteBoard.css';

import QuoteBoardItem from '../QuoteBoardItem/QuoteBoardItem';

import {fetchQuotes} from '../../actions/index';

class QuoteBoard extends Component {
  renderList() {
    const quotesObjectList = this.props.quotes.map(
      (quoteObject, index) => 
        <QuoteBoardItem 
          key={quoteObject.title}
          backgroundImageId={index % 10}
          quoteObject={quoteObject}
        />
    );
    return quotesObjectList;
  }
  dailyUpdate(quoteObjectList) {
    const date = new Date();
    for (let i = 0; i < quoteObjectList.length; i += 1) {
      if (quoteObjectList[i].dateSet !== date.toLocaleDateString()) {
        quoteObjectList[i].current < quoteObjectList[i].total - 1 ? quoteObjectList[i].current += 1 : quoteObjectList[i].current = 0;
        quoteObjectList[i].dateSet = date.toLocaleDateString()
      }
    }
  }
  render() {
    this.dailyUpdate(this.props.quotes);
    if (this.props.quotes.length === 0) {
      return (
        <div className="empty-quote-board">
          <p>
            Add A
            <br/>
            Source
            <br/>
            To Begin
          </p>
        </div>
      );
    } else if (this.props.quotes.length === 1) {
      return (
        <ul className="singular-quote-board">
          <QuoteBoardItem 
            quoteObject={this.props.quotes[0]}
          />
        </ul>
      );
    } else {
      return (
        <ul className="quote-board">
          {this.renderList()}
        </ul>
      );
    }
  }
}

function mapStateToProps({quotes}) {
  return {quotes};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchQuotes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteBoard);