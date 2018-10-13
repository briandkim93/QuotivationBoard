import axios from 'axios';

import ACTION_TYPES from './types'

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.xsrfCookieName = 'csrftoken';

export function toggleMenu() {
  return {
    type: ACTION_TYPES.TOGGLE_MENU
  };
}

export function closeMenu() {
  return {
    type: ACTION_TYPES.CLOSE_MENU
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
      query: query,
      time: Date.now()
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

export function changeQuote(source, token) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}account_to_quoteset/${source.id}/`,
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      method: 'change'
    }
  })
  return {
    type: ACTION_TYPES.CHANGE_QUOTE,
    payload: request,
  };
}

export function refreshQuotes(sources, token) {
  const d = new Date();
  const date = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate()
  };
  const requests = sources.map(source => axios({
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
  return {
    type: ACTION_TYPES.REFRESH_QUOTES,
    payload: Promise.all(requests),
    meta: { 
      sources: sources
    }
  };
}