import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeQuote } from '../../actions/index';

class QuotivationBoardItem extends Component {
  constructor(props) {
    super(props);

    this.handleChangeQuote = this.handleChangeQuote.bind(this);
  }

  handleChangeQuote() {
    this.props.changeQuote(this.props.quoteInfo, this.props.token);
  }
  
  render() {
    return (
      <li className={`quote-board-item background-${this.props.backgroundImageId}`}>
        <div className="quote">
          <div className="quote-text">
            {this.props.quoteInfo.quote}
            &nbsp;
            <p className="change-button" onClick={this.handleChangeQuote}>&#10149;</p>
          </div>
          <span className="quote-source">-{this.props.quoteInfo.author}</span>
        </div>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeQuote: changeQuote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotivationBoardItem);