import React, { Component } from 'react';

import SidePanel from '../SidePanel/SidePanel';
import QuotivationBoard from '../QuotivationBoard/QuotivationBoard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SidePanel />
        <QuotivationBoard />
      </div>
    );
  }
}

export default App;