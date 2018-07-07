import React, { Component } from 'react';

import SearchBar from '../../containers/SearchBar/SearchBar'
import SearchResultList from '../../containers/SearchResultList/SearchResultList'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div>
          <SearchBar />
          <SearchResultList />
        </div>
      </div>
    );
  }
}

export default App;
