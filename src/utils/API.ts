import Axios from 'axios';
import parseLinkHeader = require('parse-link-header');

import * as mockSearchResult from '~/mocks/searchResult.json';

const axios = Axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.mercy-preview+json',
  },
});

export async function fetchSubscriptions() {
  const subscriptions: any[] = [];

  for (let page = 1; true; page += 1) {
    const { data, headers } = await axios.get('/user/subscriptions', {
      params: {
        page,
        per_page: 100,
      },
    });
    subscriptions.push(...data);

    const link = parseLinkHeader(headers['link']);
    if (!link.last || parseInt(link.last.page, 10) === page) {
      break;
    }
  }
  return subscriptions;
}

export async function searchRepositories() {
  // mock
  return {
    items: mockSearchResult.items,
    lastPage: 10,
  };
}

export async function setWatchState() {
  return;
}
