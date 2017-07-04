import { createAction } from 'redux-actions';
import * as Types from './actionTypes';
import { SearchQueryPayload } from '~/reducers/searchQueryReducers';

export interface ChangeStatusQuery {
  id: number;
  full_name: string;
  isSubscripted: boolean | 'unknown';
}

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

export const changeWatchStatus = createAction<ChangeStatusQuery, any>(
  Types.USER_CHANGE_WATCH_STATUS,
  status => status,
);

export const startSearching = createAction(Types.REDUCER_START_SEARCHING);

export const setSearchResults = createAction<any[], any[]>(
  Types.REDUCER_SET_SEARCH_RESULTS,
  repos => repos,
);

export const setSubscriptions = createAction<any[], any[]>(
  Types.REDUCER_SET_SUBSCRIPTION,
  repos => repos,
);

export const setWatchStatus = createAction<
  ChangeStatusQuery,
  ChangeStatusQuery
>(Types.REDUCER_SET_WATCH_STATUS, status => status);

export const addSubscription = createAction<any, any>(
  Types.REDUCER_ADD_SUBSCRIPTION,
  repo => repo,
);
