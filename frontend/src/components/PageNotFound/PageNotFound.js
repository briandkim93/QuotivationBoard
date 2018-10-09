import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = () => {
    return (
      <div className="page-not-found">
        <img src="/images/404.png" alt="404 Error Logo" />
        <h1 className="page-not-found-title">
          Page Not Found
        </h1>
        <div className="homepage-link">
          <Link className="text-link text-link-violet" to='/'>Back to Homepage</Link>
        </div>
      </div>
    );
}

export default PageNotFound;