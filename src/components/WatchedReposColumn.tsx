import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import { RepoList } from '~/components/RepoList';
import { Pagenation } from '~/components/Pagenation';

import * as Actions from '~/actions/actions';

export interface WatchedReposColumnProps {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  widthSize: number;
  actions: typeof Actions;
}

export class WatchedReposColumn extends React.Component<
  WatchedReposColumnProps,
  undefined
> {
  @autobind
  handleClickPrev() {
    this.props.actions.clickSubscriptionsPrev();
  }

  @autobind
  handleClickNext() {
    this.props.actions.clickSubscriptionsNext();
  }

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
            actions={this.props.actions}
            itemsPerRow={this.props.widthSize}
            repos={this.getSubscriptonsInPage()}
          />
        </Segment>
        <Segment vertical textAlign="center" style={{ flexGrow: '0' }}>
          <Pagenation
            onClickPrev={this.handleClickPrev}
            onClickNext={this.handleClickNext}
            {...this.props.pagenation}
          />
        </Segment>
      </Grid.Column>
    );
  }
}
