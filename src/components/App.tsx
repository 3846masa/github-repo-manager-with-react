import * as React from 'react';
import {
  Grid,
  Accordion,
  Icon,
  Form,
  Card,
  Button,
  Segment,
  Header,
  Label,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { RepoCard } from '~/components/RepoCard';
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

  getSubscriptonsInPage(page) {
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
            <Form>
              <Form.Input
                icon="search"
                iconPosition="left"
                placeholder="Search"
              />
              <Accordion fluid>
                <Accordion.Title>
                  <Icon name="dropdown" />
                  Advanced Search
                </Accordion.Title>
                <Accordion.Content>
                  <Form.Group widths="equal">
                    <Form.Select
                      label="Sort options"
                      options={[
                        {
                          key: 'best_match',
                          text: 'Best match',
                          value: 'best_match',
                        },
                        { key: 'stars', text: 'Most stars', value: 'stars' },
                        { key: 'forks', text: 'Most forks', value: 'forks' },
                        {
                          key: 'updated',
                          text: 'Recentely updated',
                          value: 'updated',
                        },
                      ]}
                      defaultValue="best_match"
                    />
                    <Form.Select
                      label="Language"
                      options={[
                        { key: 'any', text: 'Any Language', value: 'any' },
                        {
                          key: 'ActionScript',
                          text: 'ActionScript',
                          value: 'ActionScript',
                        },
                        { key: 'C', text: 'C', value: 'C' },
                        { key: 'C#', text: 'C#', value: 'C#' },
                        { key: 'C++', text: 'C++', value: 'C++' },
                        { key: 'Clojure', text: 'Clojure', value: 'Clojure' },
                        {
                          key: 'CoffeeScript',
                          text: 'CoffeeScript',
                          value: 'CoffeeScript',
                        },
                        { key: 'CSS', text: 'CSS', value: 'CSS' },
                        { key: 'Go', text: 'Go', value: 'Go' },
                        { key: 'Haskell', text: 'Haskell', value: 'Haskell' },
                        { key: 'HTML', text: 'HTML', value: 'HTML' },
                        { key: 'Java', text: 'Java', value: 'Java' },
                        {
                          key: 'JavaScript',
                          text: 'JavaScript',
                          value: 'JavaScript',
                        },
                        { key: 'Lua', text: 'Lua', value: 'Lua' },
                        { key: 'Matlab', text: 'Matlab', value: 'Matlab' },
                        {
                          key: 'Objective-C',
                          text: 'Objective-C',
                          value: 'Objective-C',
                        },
                        { key: 'Perl', text: 'Perl', value: 'Perl' },
                        { key: 'PHP', text: 'PHP', value: 'PHP' },
                        { key: 'Python', text: 'Python', value: 'Python' },
                        { key: 'R', text: 'R', value: 'R' },
                        { key: 'Ruby', text: 'Ruby', value: 'Ruby' },
                        { key: 'Scala', text: 'Scala', value: 'Scala' },
                        { key: 'Shell', text: 'Shell', value: 'Shell' },
                        { key: 'Swift', text: 'Swift', value: 'Swift' },
                        { key: 'TeX', text: 'TeX', value: 'TeX' },
                        {
                          key: 'Vim script',
                          text: 'Vim script',
                          value: 'Vim script',
                        },
                      ]}
                      defaultValue="any"
                    />
                  </Form.Group>
                </Accordion.Content>
              </Accordion>
            </Form>
          </Segment>
          <Segment vertical>
            <Dimmer inverted active={this.state.loading.search}>
              <Loader inverted>Loading...</Loader>
            </Dimmer>
            <Card.Group
              itemsPerRow="3"
              style={{
                margin: '0',
                overflowX: 'hidden',
                overflowY: 'scroll',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
              }}
            >
              {this.state.results.repos.map(repo =>
                <RepoCard key={repo.id} {...repo} />,
              )}
            </Card.Group>
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
          <Segment
            vertical
            style={{ overflowX: 'hidden', overflowY: 'scroll' }}
          >
            <Card.Group itemsPerRow="1" style={{ margin: '0' }}>
              {this.getSubscriptonsInPage(
                this.state.subscriptions.pagenation.page,
              ).map(repo => <RepoCard key={repo.id} {...repo} />)}
            </Card.Group>
          </Segment>
          <Segment vertical textAlign="center" style={{ flexGrow: '0' }}>
            <Pagenation {...this.state.subscriptions.pagenation} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
