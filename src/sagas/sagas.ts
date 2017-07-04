import { Task } from 'redux-saga';
import {
  takeEvery,
  takeLatest,
  call,
  cancel,
  select,
  throttle,
  put,
  fork,
  ForkEffect,
  CallEffect,
  PutEffect,
  SelectEffect,
  CancelEffect,
} from 'redux-saga/effects';
import * as Types from '~/actions/actionTypes';
import * as Actions from '~/actions/actions';
import * as API from '~/utils/API';
export { ForkEffect, CallEffect, PutEffect, SelectEffect, CancelEffect };

export const getQuery = (state: any) => state.searchQuery;
export const getSubscriptions = (state: any) => state.subscriptions.repos;
export const getSearchResults = (state: any) => state.searchResults.repos;
export const getSearchResultsPage = (state: any) =>
  state.searchResults.pagenation.page;

export function* initialize() {
  const repos = yield call(API.fetchSubscriptions);
  const reposWithProps = repos.map((r: any) => ({
    ...r,
    isSubscribed: true,
  }));
  yield put(Actions.setSubscriptions(reposWithProps));
}

let searchTask: Task | null = null;

export function* searchRepos(action: any) {
  if (searchTask) {
    yield cancel(searchTask);
  }

  yield put(Actions.startSearching());
  const query = {
    ...yield select(getQuery),
    ...action.payload,
  };
  const subscriptions = yield select(getSubscriptions);

  const { lastPage, items: repos } = yield call(API.searchRepositories, query);

  const reposWithProps = repos.map((r: any) => {
    const isSubscribed = subscriptions.some((s: any) => s.id === r.id);
    return {
      ...r,
      isSubscribed,
    };
  });

  yield put(Actions.setSearchResults(reposWithProps));

  const page = query.page || 1;
  yield put(
    Actions.setSearchResultsPagenation({
      page,
      isFirstPage: page === 1,
      isLastPage: page === lastPage,
    }),
  );
}

export function* searchReposFromQuery(action: any) {
  searchTask = yield fork(searchRepos, action);
}

export function* searchReposNext() {
  const page = (yield select(getSearchResultsPage)) + 1;
  const query = {
    ...yield select(getQuery),
    page,
  };
  searchTask = yield fork(searchRepos, { payload: query });
}

export function* searchReposPrev() {
  const page = (yield select(getSearchResultsPage)) - 1;
  const query = {
    ...yield select(getQuery),
    page,
  };
  searchTask = yield fork(searchRepos, { payload: query });
}

export function* changeWatchStatus(action: any) {
  const payload = action.payload;

  yield put(
    Actions.setWatchStatus({
      ...payload,
      isSubscribed: 'unknown',
    }),
  );
  yield call(API.setWatchState, { ...action.payload });
  yield put(
    Actions.setWatchStatus({
      ...payload,
    }),
  );

  if (payload.isSubscribed === true) {
    const repo = (yield select(getSearchResults)).find(
      (r: any) => r.id === payload.id,
    );
    yield put(Actions.addSubscription(repo));
  }
}

export function* saga() {
  yield takeLatest(Types.SYSTEM_LAUNCH_APP, initialize);
  yield throttle(1000, Types.USER_CHANGE_QUERY, searchReposFromQuery);
  yield takeLatest(Types.USER_CLICK_SEARCH_RESULTS_PREV, searchReposPrev);
  yield takeLatest(Types.USER_CLICK_SEARCH_RESULTS_NEXT, searchReposNext);
  yield takeEvery(Types.USER_CHANGE_WATCH_STATUS, changeWatchStatus);
}
