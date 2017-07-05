import { createAction } from 'redux-actions';
import * as Types from './actionTypes';
import { SearchQueryPayload } from '~/reducers/searchQueryReducers';

export interface ChangeStatusQuery {
  id: number;
  full_name: string;
  isSubscribed: boolean | 'unknown';
}

export const launchApp = createAction(Types.SYSTEM_LAUNCH_APP);

export const confirmErrorModal = createAction(Types.USER_CONFIRM_ERROR_MODAL);

export const clickAllWatchInPage = createAction(
  Types.USER_CLICK_ALL_WATCH_IN_PAGE,
);
export const clickAllUnwatchInPage = createAction(
  Types.USER_CLICK_ALL_UNWATCH_IN_PAGE,
);

export const clickSubscriptionsPrev = createAction(
  Types.USER_CLICK_SUBSCRIPTIONS_PREV,
);
export const clickSubscriptionsNext = createAction(
  Types.USER_CLICK_SUBSCRIPTIONS_NEXT,
);
export const clickSearchResultsPrev = createAction(
  Types.USER_CLICK_SEARCH_RESULTS_PREV,
);
export const clickSearchResultsNext = createAction(
  Types.USER_CLICK_SEARCH_RESULTS_NEXT,
);

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

export const setSearchResultsPagenation = createAction<any, any>(
  Types.REDUCER_SET_SEARCH_RESULTS_PAGENATION,
  page => page,
);

export const startChangingAllWatchStatus = createAction(
  Types.REDUCER_START_CHANGING_ALL_WATCH_STATUS,
);
export const doneChangingAllWatchStatus = createAction(
  Types.REDUCER_DONE_CHANGING_ALL_WATCH_STATUS,
);

export const causeError = createAction<Error, Error>(
  Types.REDUCER_CAUSE_ERROR,
  error => error,
);
