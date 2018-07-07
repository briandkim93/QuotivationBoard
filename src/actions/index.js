import axios from 'axios';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FETCH_QUOTES = 'FETCH_QUOTES';

const baseURL = 'https://en.wikiquote.org/w/api.php?';

export function fetchSearchResults(query) {
  const options = `action=opensearch&search=${query}`;
  const request = axios.get(`${baseURL}${options}`);
  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
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