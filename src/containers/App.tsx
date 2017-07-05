import * as React from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '~/actions/actions';
import { RootState } from '~/reducers/reducers';
import { SearchColumn } from '~/components/SearchColumn';
import { WatchedReposColumn } from '~/components/WatchedReposColumn';
import { ErrorModal } from '~/components/ErrorModal';

export interface AppProps extends RootState {
  actions: typeof Actions;
}

class AppContainer extends React.Component<AppProps, undefined> {
  componentDidMount() {
    this.props.actions.launchApp();
  }

  render() {
    const { subscriptions, searchResults, error } = this.props;
    return (
      <Grid stretched divided style={{ margin: '0', height: '100vh' }}>
        <ErrorModal actions={this.props.actions} error={error} />
        <Dimmer active={subscriptions.loading}>
          <Loader>Initialize...</Loader>
        </Dimmer>
        <SearchColumn
          actions={this.props.actions}
          widthSize={3}
          {...searchResults}
        />
        <WatchedReposColumn
          actions={this.props.actions}
          widthSize={1}
          {...subscriptions}
        />
      </Grid>
    );
  }
}

function mapStateToProps(state: RootState) {
  return { ...state };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch),
  };
}

// tslint:disable-next-line:variable-name
export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
