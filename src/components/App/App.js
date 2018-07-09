import React, { Component } from 'react';

import SidePanel from '../SidePanel/SidePanel';
import QuoteBoard from '../../containers/QuoteBoard/QuoteBoard';

class App extends Component {
  render() {
    return (
      <div className="app container-fluid">
        <div className="row">
          <SidePanel />
          <QuoteBoard />
        </div>
      </div>
    );
  }
}

export default App;