import React, { Component } from 'react';

class SearchResultItem extends Component {
  render() {
    return (
      <li>
        {this.props.term}
      </li>
    );
  }
};

export default SearchResultItem;
