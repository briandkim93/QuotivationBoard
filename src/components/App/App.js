import React, { Component } from 'react';

import SidePanel from '../../containers/SidePanel/SidePanel';
import QuoteBoard from '../../containers/QuoteBoard/QuoteBoard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SidePanel />
        <QuoteBoard />
      </div>
    );
  }
}

export default App;