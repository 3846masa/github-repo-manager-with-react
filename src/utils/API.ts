import Axios from 'axios';
import parseLinkHeader = require('parse-link-header');

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
    if (!link || !link.last || parseInt(link.last.page, 10) === page) {
      break;
    }
  }
  return subscriptions.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
}

export async function searchRepositories(query: any) {
  const queryText = query.language
    ? `${query.query} language:"${query.language}"`
    : query.query;

  const params = {
    sort: query.sort,
    q: queryText.replace(/^\s*|\s*$/g, ''),
    page: query.page,
  };

  if (!params.q) {
    return {
      items: [],
      lastPage: 1,
    };
  }

  const { data, headers } = await axios.get('/search/repositories', {
    params,
  });
  const link = parseLinkHeader(headers['link']);

  const lastPage =
    link && link.last ? parseInt(link.last.page, 10) : query.page || 1;
  return {
    lastPage,
    items: data.items,
  };
}

export async function setWatchState({
  fullName,
  isSubscribed,
}: {
  fullName: string;
  isSubscribed: boolean;
}) {
  if (isSubscribed) {
    await axios.put(`/repos/${fullName}/subscription`, {
      subscribed: true,
    });
  } else {
    await axios.delete(`/repos/${fullName}/subscription`);
  }
}
