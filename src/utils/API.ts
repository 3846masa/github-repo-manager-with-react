import * as mockSubscriptions from '~/mocks/subscriptions.json';
import * as mockSearchResult from '~/mocks/searchResult.json';

export async function fetchSubscriptions() {
  // mock
  return mockSubscriptions;
}

export async function searchRepositories() {
  // mock
  return mockSearchResult.items;
}
