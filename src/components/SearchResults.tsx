import * as React from 'react';
import { Grid, Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import { RepoList } from '~/components/RepoList';
import { Pagenation } from '~/components/Pagenation';

import * as Actions from '~/actions/actions';

export interface SearchResultsProps {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  loading: boolean;
  widthSize: number;
  actions: typeof Actions;
}

export class SearchResults extends React.Component<
  SearchResultsProps,
  undefined
> {
  @autobind
  handleClickPrev() {
    this.props.actions.clickSearchResultsPrev();
  }

  @autobind
  handleClickNext() {
    this.props.actions.clickSearchResultsNext();
  }

  @autobind
  handleClickAllWatchInPage() {
    this.props.actions.clickAllWatchInPage();
  }

  @autobind
  handleClickAllUnwatchInPage() {
    this.props.actions.clickAllUnwatchInPage();
  }

  render() {
    return (
      <Grid.Column stretched>
        <Dimmer inverted active={this.props.loading}>
          <Loader inverted>Loading...</Loader>
        </Dimmer>
        <Segment vertical>
          <RepoList
            actions={this.props.actions}
            itemsPerRow={this.props.widthSize}
            repos={this.props.repos}
          />
        </Segment>
        <Segment vertical style={{ flexGrow: '0' }}>
          <Pagenation
            onClickPrev={this.handleClickPrev}
            onClickNext={this.handleClickNext}
            {...this.props.pagenation}
          />
          <Button
            onClick={this.handleClickAllUnwatchInPage}
            disabled={this.props.loading}
            floated="right"
            color="red"
          >
            Unwatch all in this page
          </Button>
          <Button
            onClick={this.handleClickAllWatchInPage}
            disabled={this.props.loading}
            floated="right"
            color="blue"
          >
            Watch all in this page
          </Button>
        </Segment>
      </Grid.Column>
    );
  }
}
