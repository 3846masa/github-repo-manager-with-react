import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { RepoList } from '~/components/RepoList';
import { Pagenation } from '~/components/Pagenation';

export interface WatchedReposColumnProps {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  widthSize: number;
}

export class WatchedReposColumn extends React.Component<
  WatchedReposColumnProps,
  undefined
> {
  getSubscriptonsInPage() {
    const page = this.props.pagenation.page;
    return this.props.repos.slice((page - 1) * 30, page * 30);
  }

  render() {
    return (
      <Grid.Column stretched style={{ flexGrow: this.props.widthSize }}>
        <Segment vertical style={{ flexGrow: '0' }}>
          <Header as="h2">Watched repositories</Header>
        </Segment>
        <Segment vertical>
          <RepoList
            itemsPerRow={this.props.widthSize}
            repos={this.getSubscriptonsInPage()}
          />
        </Segment>
        <Segment vertical textAlign="center" style={{ flexGrow: '0' }}>
          <Pagenation {...this.props.pagenation} />
        </Segment>
      </Grid.Column>
    );
  }
}
