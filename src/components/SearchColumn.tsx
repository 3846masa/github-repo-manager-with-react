import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { SearchForm } from '~/components/SearchForm';
import { SearchResults } from '~/components/SearchResults';
import * as Actions from '~/actions/actions';

export interface SearchColumnProps {
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

export class SearchColumn extends React.Component<
  SearchColumnProps,
  undefined
> {
  render() {
    return (
      <Grid.Column stretched style={{ flexGrow: this.props.widthSize }}>
        <Segment vertical style={{ flexGrow: '0', zIndex: '1' }}>
          <SearchForm actions={this.props.actions} />
        </Segment>
        <Grid style={{ zIndex: '0' }}>
          <SearchResults {...this.props} />
        </Grid>
      </Grid.Column>
    );
  }
}
