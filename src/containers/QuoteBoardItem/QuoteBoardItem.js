import React, { Component } from 'react';

class QuoteBoardItem extends Component {
  render() {
    return (
      <li>
        <p>{this.props.quoteObject.quoteList[this.props.quoteObject.current]}</p>
        <p>-{this.props.quoteObject.title}</p>
      </li>
    );
  }
}

export default QuoteBoardItem;