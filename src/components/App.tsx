import * as React from 'react';
import {
  Grid,
  Button,
  Segment,
  Header,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { SearchForm } from '~/components/SearchForm';
import { RepoList } from '~/components/RepoList';
import { Pagenation } from '~/components/Pagenation';

import * as mockResult from '~/mocks/searchResult.json';
import * as mockSubscriptions from '~/mocks/subscriptions.json';

export interface AppState {
  results: {
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
      results: {
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

  getSubscriptonsInPage() {
    const page = this.state.subscriptions.pagenation.page;
    return this.state.subscriptions.repos.slice((page - 1) * 30, page * 30);
  }

  render() {
    return (
      <Grid stretched divided style={{ margin: '0', height: '100vh' }}>
        <Dimmer active={this.state.loading.initialize}>
          <Loader>Initialize...</Loader>
        </Dimmer>
        <Grid.Column stretched style={{ flexGrow: '3' }}>
          <Segment vertical style={{ flexGrow: '0' }}>
            <SearchForm />
          </Segment>
          <Segment vertical>
            <Dimmer inverted active={this.state.loading.search}>
              <Loader inverted>Loading...</Loader>
            </Dimmer>
            <RepoList itemsPerRow={3} repos={this.state.results.repos} />
          </Segment>
          <Segment vertical style={{ flexGrow: '0' }}>
            <Pagenation {...this.state.results.pagenation} />
            <Button floated="right" color="red">
              Unwatch all in this page
            </Button>
            <Button floated="right" color="blue">
              Watch all in this page
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column stretched style={{ flexGrow: '1' }}>
          <Segment vertical style={{ flexGrow: '0' }}>
            <Header as="h2">Watched repositories</Header>
          </Segment>
          <Segment vertical>
            <RepoList itemsPerRow={1} repos={this.getSubscriptonsInPage()} />
          </Segment>
          <Segment vertical textAlign="center" style={{ flexGrow: '0' }}>
            <Pagenation {...this.state.subscriptions.pagenation} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
