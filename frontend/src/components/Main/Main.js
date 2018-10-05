import React from 'react';
import { Switch, Route } from 'react-router-dom';

import QuotivationBoard from '../QuotivationBoard/QuotivationBoard';
import AccountSettings from '../Authentication/AccountSettings/AccountSettings';
import EmailVerify from '../Authentication/EmailVerify/EmailVerify';
import PasswordReset from '../Authentication/PasswordReset/PasswordReset';
import PageNotFound from '../PageNotFound/PageNotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={QuotivationBoard} />
      <Route path='/account/settings' component={AccountSettings} />
      <Route path='/verify/:email_verification_code' component={EmailVerify} />
      <Route path='/reset/:uid/:token' component={PasswordReset} />
      <Route component={PageNotFound} />
    </Switch>
  </main>
);

export default Main;