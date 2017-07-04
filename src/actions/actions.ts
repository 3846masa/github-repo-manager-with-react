import { createAction } from 'redux-actions';
import * as Types from './actionTypes';
import { SearchQueryPayload } from '~/reducers/searchQueryReducers';

export const launchApp = createAction(Types.SYSTEM_LAUNCH_APP);

export const changeQuery = createAction<
  SearchQueryPayload,
  any
>(Types.USER_CHANGE_QUERY, query => {
  if (query.sort && query.sort === 'best_match') {
    query.sort = '';
  }
  if (query.language && query.language === 'any') {
    query.language = '';
  }
  return query;
});

export const startSearching = createAction(Types.REDUCER_START_SEARCHING);

export const setSearchResults = createAction<any[], any[]>(
  Types.REDUCER_SET_SEARCH_RESULTS,
  repos => repos,
);

export const setSubscriptions = createAction<any[], any[]>(
  Types.REDUCER_SET_SUBSCRIPTION,
  repos => repos,
);
