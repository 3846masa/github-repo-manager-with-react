import * as React from 'react';
import { Grid, Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { RepoList } from '~/components/RepoList';
import { Pagenation } from '~/components/Pagenation';

export interface SearchResultsProps {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  loading: boolean;
  widthSize: number;
}

export class SearchResults extends React.Component<
  SearchResultsProps,
  undefined
> {
  render() {
    return (
      <Grid.Column stretched>
        <Dimmer inverted active={this.props.loading}>
          <Loader inverted>Loading...</Loader>
        </Dimmer>
        <Segment vertical>
          <RepoList
            itemsPerRow={this.props.widthSize}
            repos={this.props.repos}
          />
        </Segment>
        <Segment vertical style={{ flexGrow: '0' }}>
          <Pagenation {...this.props.pagenation} />
          <Button floated="right" color="red">
            Unwatch all in this page
          </Button>
          <Button floated="right" color="blue">
            Watch all in this page
          </Button>
        </Segment>
      </Grid.Column>
    );
  }
}