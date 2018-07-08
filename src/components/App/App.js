import React, { Component } from 'react';

import SearchBar from '../../containers/SearchBar/SearchBar'
import SearchResultList from '../../containers/SearchResultList/SearchResultList'
import QuoteBoard from '../../containers/QuoteBoard/QuoteBoard'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div>
          <SearchBar />
          <SearchResultList />
        </div>
        <QuoteBoard />
      </div>
    );
  }
}

export default App;