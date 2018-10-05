import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { refreshQuotes } from '../../actions/index';

class QuoteRefresher extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.refreshTokenStatus !== prevProps.refreshTokenStatus && this.props.token) {
      if (this.props.refreshTokenStatus.status === 200) {
        this.props.refreshQuotes(this.props.sources, this.props.token);
      }
    }
    if (this.props.sources.join('') !== prevProps.sources.join('') && this.props.token) {
      this.props.refreshQuotes(this.props.sources, this.props.token);
    }
  }
  
  render() {
    return (
      <div />
    );
  }
}

function mapStateToProps(state) {
  return {
    refreshTokenStatus: state.refreshTokenStatus,
    sources: state.sources,
    token: state.token
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    refreshQuotes: refreshQuotes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteRefresher);