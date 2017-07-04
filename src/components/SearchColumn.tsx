import * as React from 'react';
import { Grid, Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { SearchForm } from '~/components/SearchForm';
import { RepoList } from '~/components/RepoList';
import { Pagenation } from '~/components/Pagenation';

export interface SearchColumnProps {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  loading: boolean;
  widthSize: number;
}

export class SearchColumn extends React.Component<
  SearchColumnProps,
  undefined
> {
  render() {
    return (
      <Grid.Column stretched style={{ flexGrow: this.props.widthSize }}>
        <Segment vertical style={{ flexGrow: '0' }}>
          <SearchForm />
        </Segment>
        <Segment vertical>
          <Dimmer inverted active={this.props.loading}>
            <Loader inverted>Loading...</Loader>
          </Dimmer>
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
