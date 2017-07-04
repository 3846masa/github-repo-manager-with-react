import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { SearchForm } from '~/components/SearchForm';
import { SearchResults } from '~/components/SearchResults';

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
        <Grid>
          <SearchResults {...this.props} />
        </Grid>
      </Grid.Column>
    );
  }
}
