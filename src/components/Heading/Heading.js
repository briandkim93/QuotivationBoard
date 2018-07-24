import React from 'react';

import './Heading.css';
import logo from './images/qb-logo.png'

const Heading = props => {
  return (
    <div className="heading">
      <img className="logo" src={logo} alt="QuoteBoard Logo" />
      <span className="title">
        <h1>QuoteBoard</h1>
      </span>
    </div>
  );
};

export default Heading;