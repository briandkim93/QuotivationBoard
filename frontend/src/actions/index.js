import axios from 'axios';

import ACTION_TYPES from './types'
import API_BASE_URL from './apiInfo';

export function toggleMenu() {
  return {
    type: ACTION_TYPES.TOGGLE_MENU
  };
}

export function getSearchResults(query) {
  const request = axios({
    method: 'get',
    url: `${API_BASE_URL}author/`
  });
  return {
    type: ACTION_TYPES.GET_SEARCH_RESULTS,
    payload: request,
    meta: { 
      query: query 
    }
  };
}

export function clearSearchResults() {
  return {
    type: ACTION_TYPES.CLEAR_SEARCH_RESULTS
  };
}

export function getSources(token) {
  const request = axios({
    method: 'get',
    url: `${API_BASE_URL}account_to_quoteset/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  return {
    type: ACTION_TYPES.GET_SOURCES,
    payload: request
  };
}

export function addSource(authorId, token) {
  const d = new Date();
  const date = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate()
  };
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}account_to_quoteset/`,
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      quoteset: authorId,
      date: date
    }
  })
  return {
    type: ACTION_TYPES.ADD_SOURCE,
    payload: request
  };
}

export function removeSource(sourceId, token) {
  const request = axios({
    method: 'delete',
    url: `${API_BASE_URL}account_to_quoteset/${sourceId}/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  return {
    type: ACTION_TYPES.REMOVE_SOURCE,
    payload: request,
    meta: { 
      sourceId: sourceId
    }
  };
}

export function getFollowingList(sources) {
  const requests = sources.map(source => axios({
      method: 'get',
      url: `${API_BASE_URL}author/${source.quoteset}/`,
    })
  );
  return {
    type: ACTION_TYPES.GET_FOLLOWING_LIST,
    payload: Promise.all(requests)
  };
}

export function getQuotes(sources, token) {
  const requests = sources.map(source => axios({
      method: 'get',
      url: `${API_BASE_URL}quoteset/${source.quoteset}/`,
      headers: {
        'Authorization': `Token ${token}`
      }
    })
  );
  return {
    type: ACTION_TYPES.GET_QUOTES,
    payload: Promise.all(requests),
    meta: {
      sources: sources
    }
  };
}

export function changeQuote(quoteInfo, token) {
  const changeRequest = axios({
    method: 'patch',
    url: `${API_BASE_URL}account_to_quoteset/${quoteInfo.sourceId}/`,
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      method: 'change'
    }
  })
  const getQuoteSetRequest = axios({
    method: 'get',
    url: `${API_BASE_URL}quoteset/${quoteInfo.quotesetId}/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  return {
    type: ACTION_TYPES.CHANGE_QUOTE,
    payload: Promise.all([changeRequest, getQuoteSetRequest]),
    meta: { 
      sourceId: quoteInfo.sourceId
    }
  };
}

export function refreshQuotes(sources, token) {
  const d = new Date();
  const date = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate()
  };
  const changeRequests = sources.map(source => axios({
      method: 'patch',
      url: `${API_BASE_URL}account_to_quoteset/${source.id}/`,
      headers: {
        'Authorization': `Token ${token}`
      },
      data: {
        method: 'refresh',
        date: date
      }
    })
    .catch(error => {
      return error.response;
    })
  );
  const getQuoteSetRequests = sources.map(source => axios({
    method: 'get',
    url: `${API_BASE_URL}quoteset/${source.quoteset}/`,
    headers: {
      'Authorization': `Token ${token}`
      }
    })
  );
  return {
    type: ACTION_TYPES.REFRESH_QUOTES,
    payload: Promise.all(changeRequests.concat(getQuoteSetRequests)),
    meta: { 
      sources: sources
    }
  };
}