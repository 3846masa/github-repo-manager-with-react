import * as React from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { SearchColumn } from '~/components/SearchColumn';
import { WatchedReposColumn } from '~/components/WatchedReposColumn';

import * as mockResult from '~/mocks/searchResult.json';
import * as mockSubscriptions from '~/mocks/subscriptions.json';

export interface AppState {
  searchResults: {
    pagenation: {
      isFirstPage: boolean;
      isLastPage: boolean;
      page: number;
    };
    repos: any[];
  };
  subscriptions: {
    pagenation: {
      isFirstPage: boolean;
      isLastPage: boolean;
      page: number;
    };
    repos: any[];
  };
  loading: {
    search: boolean;
    initialize: boolean;
  };
}

export class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      searchResults: {
        pagenation: {
          isFirstPage: true,
          isLastPage: false,
          page: 1,
        },
        repos: mockResult.items,
      },
      subscriptions: {
        pagenation: {
          isFirstPage: true,
          isLastPage: false,
          page: 1,
        },
        repos: mockSubscriptions,
      },
      loading: {
        search: false,
        initialize: false,
      },
    };
  }

  render() {
    return (
      <Grid stretched divided style={{ margin: '0', height: '100vh' }}>
        <Dimmer active={this.state.loading.initialize}>
          <Loader>Initialize...</Loader>
        </Dimmer>
        <SearchColumn
          widthSize={3}
          loading={this.state.loading.search}
          {...this.state.searchResults}
        />
        <WatchedReposColumn widthSize={1} {...this.state.subscriptions} />
      </Grid>
    );
  }
}
