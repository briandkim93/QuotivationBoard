import React from 'react';

import FollowingList from '../../containers/FollowingList/FollowingList'
import SearchBar from '../../containers/SearchBar/SearchBar'
import SearchResultList from '../../containers/SearchResultList/SearchResultList'

const SidePanel = props => {
  return (
    <div className="side-panel col-4">
      <FollowingList />
      <SearchBar />
      <SearchResultList />
    </div>
  );
};

export default SidePanel;