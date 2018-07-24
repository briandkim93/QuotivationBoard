import axios from 'axios';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FILTER_SEARCH_RESULTS = 'FILTER_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SET_DISPLAY_LOADER = 'SET_DISPLAY_LOADER';
export const TOGGLE_SIDE_PANEL = 'TOGGLE_SIDE_PANEL';
export const FETCH_QUOTES = 'FETCH_QUOTES';
export const REFRESH_QUOTE = 'REFRESH_QUOTE';

const baseURL = 'https://en.wikiquote.org/w/api.php?';

export function fetchSearchResults(query) {
  const options = `action=opensearch&redirects=resolve&limit=10&search=${query}`;
  const request = axios.get(`${baseURL}${options}`);
  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  };
}

export function filterSearchResults(terms) {
  const parsedTerms = terms.map(term => term.replace(' ', '%20'));
  const requestLinks = parsedTerms.map(parsedTerm => `${baseURL}action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=${parsedTerm}`);
  const requests = Promise.all(requestLinks.map(requestLink => axios.get(requestLink)));
  return {
    type: FILTER_SEARCH_RESULTS,
    payload: requests
  };
}

export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}

export function setDisplayLoader(phase) {
  return {
    type: SET_DISPLAY_LOADER,
    payload: phase
  };
}

export function toggleSidePanel() {
  return {
    type: TOGGLE_SIDE_PANEL
  };
}

export function fetchQuotes(term) {
  const parsedTerm = term.replace(' ', '%20');
  const options = `action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=${parsedTerm}`;
  const request = axios.get(`${baseURL}${options}`);
  return {
    type: FETCH_QUOTES,
    payload: request
  };
}

export function refreshQuote(quoteObject) {
  const refreshedQuoteObject = Object.assign({}, quoteObject);
  refreshedQuoteObject.current < refreshedQuoteObject.total - 1 ? refreshedQuoteObject.current += 1 : refreshedQuoteObject.current = 0;
  return {
    type: REFRESH_QUOTE,
    payload: refreshedQuoteObject
  }
}