import { delay } from 'redux-saga';
import {
  takeEvery,
  takeLatest,
  call,
  select,
  throttle,
  put,
  fork,
  ForkEffect,
  CallEffect,
  PutEffect,
  SelectEffect,
} from 'redux-saga/effects';
import * as Types from '~/actions/actionTypes';
import * as Actions from '~/actions/actions';
import * as API from '~/utils/API';
export { ForkEffect, CallEffect, PutEffect, SelectEffect };

export const getQuery = (state: any) => state.searchQuery;
export const getSubscriptions = (state: any) => state.subscriptions.repos;
export const getSearchResults = (state: any) => state.searchResults.repos;
export const getSearchResultsPage = (state: any) =>
  state.searchResults.pagenation.page;

export function* initialize() {
  // Fetch subscriptions (mock)
  yield delay(1000);
  const repos = yield call(API.fetchSubscriptions);
  const reposWithProps = repos.map((r: any) => ({
    ...r,
    isSubscripted: true,
  }));
  yield put(Actions.setSubscriptions(reposWithProps));
}

export function* searchRepos(action: any) {
  yield put(Actions.startSearching());
  const query = {
    ...yield select(getQuery),
    ...action.payload,
  };
  const subscriptions = yield select(getSubscriptions);

  // Search repositories (mock)
  const { lastPage, items: repos } = yield call(API.searchRepositories, query);

  const reposWithProps = repos.map((r: any) => {
    const isSubscripted = subscriptions.some((s: any) => s.id === r.id);
    return {
      ...r,
      isSubscripted,
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

export function* searchReposNext() {
  const page = (yield select(getSearchResultsPage)) + 1;
  const query = {
    ...yield select(getQuery),
    page,
  };
  yield fork(searchRepos, { payload: query });
}

export function* searchReposPrev() {
  const page = (yield select(getSearchResultsPage)) - 1;
  const query = {
    ...yield select(getQuery),
    page,
  };
  yield fork(searchRepos, { payload: query });
}

export function* changeWatchStatus(action: any) {
  const payload = action.payload;

  yield put(
    Actions.setWatchStatus({
      ...payload,
      isSubscripted: 'unknown',
    }),
  );
  // Fetch subscriptions (mock)
  yield delay(1000);
  yield call(API.setWatchState, { ...action.payload });
  yield put(
    Actions.setWatchStatus({
      ...payload,
    }),
  );

  if (payload.isSubscripted === true) {
    const repo = (yield select(getSearchResults)).find(
      (r: any) => r.id === payload.id,
    );
    yield put(Actions.addSubscription(repo));
  }
}

export function* saga() {
  yield takeEvery(Types.SYSTEM_LAUNCH_APP, initialize);
  yield throttle(2000, Types.USER_CHANGE_QUERY, searchRepos);
  yield takeLatest(Types.USER_CLICK_SEARCH_RESULTS_PREV, searchReposPrev);
  yield takeLatest(Types.USER_CLICK_SEARCH_RESULTS_NEXT, searchReposNext);
  yield takeEvery(Types.USER_CHANGE_WATCH_STATUS, changeWatchStatus);
}
