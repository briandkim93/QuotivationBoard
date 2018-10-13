import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './QuotivationBoard.css';
import { changeQuote, closeMenu } from '../../actions';

class QuotivationBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoader: false
    };

    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.renderQuoteBoard = this.renderQuoteBoard.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.refreshTokenStatus !== prevProps.refreshTokenStatus && this.props.token) {
      if (this.props.refreshTokenStatus.status === 200) {
        this.props.getSources(this.props.token);
      }
    }
    if (this.props.token !== prevProps.token && this.props.token) {
        this.setState({
          displayLoader: true
      }); 
    }
    if (this.props.sourcesStatus !== prevProps.sourcesStatus) {
      setTimeout(() => {
        this.setState({
          displayLoader: false
        }); 
      }, 1000);
    } 
  }

  getBoardType(sources) {
    if (sources.length === 0) {
      return 'empty-quotivation-board';
    } else if (sources.length === 1) {
      return 'singular-quotivation-board';
    } else {
      return 'assorted-quotivation-board';
    }
  }

  handleQuoteChange(source) {
    this.props.changeQuote(source, this.props.token);
  }

  renderQuotes(sources) {
    const quotesHTML = sources.map((source, index) => {
      const quoteWords = source.quote.split(' ');
      const lastWord = quoteWords.pop();
      const poppedQuoteText = quoteWords.join(' ');
      return (
        <li className={`quotivation-board-item bg-img-${index % 10}`} key={`source-${index}`}>
          <div className="quote">
            <div>
              {poppedQuoteText}&nbsp;
              <div className="quote-trailer">
                <div className="quote-last-word">
                  {lastWord}
                </div>
                <div className="quote-change-button" onClick={() => this.handleQuoteChange(source)}>
                  &nbsp;&#10149;
                </div>
              </div>
            </div>
            <div className="quote-source">
              -{source.author}
            </div>
          </div>
        </li>
        );
    });
    return quotesHTML;
  }

  renderQuoteBoard(boardType) {
    if (boardType === 'empty-quotivation-board') {
      return (
        <div className={`no-sources-message ${this.props.displaySignup || this.props.displayLogin || this.props.displayPasswordResetRequest ? 'no-sources-message-hidden' : ''}`}>
          Add A
          <br/>
          Source
          <br/>
          To Begin
        </div>
      );
    } else if (boardType === 'singular-quotivation-board') {
      return this.renderQuotes(this.props.sources)[0];
    } else if (boardType === 'assorted-quotivation-board') {
      return this.renderQuotes(this.props.sources);
    }
  }

  render() {
    return (
      <ul className={`quotivation-board ${this.getBoardType(this.props.sources)} ${this.props.displaySignup || this.props.displayLogin || this.props.displayPasswordResetRequest ? 'quotivation-board-blurred' : ''}`}>
        {this.state.displayLoader
          ? <div className="loader loader-lg quotivation-board-loader" />
          : this.renderQuoteBoard(this.getBoardType(this.props.sources))
        }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    displaySignup: state.displaySignup,
    displayLogin: state.displayLogin,
    displayPasswordResetRequest: state.displayPasswordResetRequest,
    displayMenu: state.displayMenu,
    sources: state.sources,
    sourcesStatus: state.sourcesStatus,
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeQuote: changeQuote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotivationBoard);