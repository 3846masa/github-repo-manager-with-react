import { delay } from 'redux-saga';
import {
  takeEvery,
  call,
  select,
  throttle,
  put,
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
  const repos = yield call(API.searchRepositories, query);
  const reposWithProps = repos.map((r: any) => {
    const isSubscripted = subscriptions.some((s: any) => s.id === r.id);
    return {
      ...r,
      isSubscripted,
    };
  });
  yield put(Actions.setSearchResults(reposWithProps));
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
  yield takeEvery(Types.USER_CHANGE_WATCH_STATUS, changeWatchStatus);
}
