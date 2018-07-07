import axios from 'axios';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';

const baseURL = 'https://en.wikiquote.org/w/api.php?';

export function fetchSearchResults(query) {
  const options = `action=opensearch&search=${query}`;
  const request = axios.get(`${baseURL}${options}`);
  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  };
}