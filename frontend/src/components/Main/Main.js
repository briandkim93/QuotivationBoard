import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import QuotivationBoard from '../QuotivationBoard/QuotivationBoard';
import AccountSettings from '../Authentication/AccountSettings/AccountSettings';
import EmailVerify from '../Authentication/EmailVerify/EmailVerify';
import PasswordReset from '../Authentication/PasswordReset/PasswordReset';
import PageNotFound from '../PageNotFound/PageNotFound';

class Main extends Component {
  render() {
    return (
      <main className={`main ${this.props.displayMenu || this.props.displaySignup || this.props.displayLogin || this.props.displayPasswordResetRequest ? 'main-dimmed' : ''}`}>
        <Switch>
          <Route exact path='/' component={QuotivationBoard} />
          <Route path='/account/settings' component={AccountSettings} />
          <Route path='/verify/:email_verification_code' component={EmailVerify} />
          <Route path='/reset/:uid/:token' component={PasswordReset} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    displayMenu: state.displayMenu,
    displaySignup: state.displaySignup,
    displayLogin: state.displayLogin,
    displayPasswordResetRequest: state.displayPasswordResetRequest,
  };
}

export default withRouter(connect(mapStateToProps)(Main));