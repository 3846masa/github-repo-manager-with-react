import { delay } from 'redux-saga';
import {
  takeEvery,
  call,
  put,
  ForkEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import * as Types from '~/actions/actionTypes';
import * as Actions from '~/actions/actions';
import * as API from '~/utils/API';
export { ForkEffect, CallEffect, PutEffect };

export function* initialize() {
  // Fetch subscriptions (mock)
  yield delay(1000);
  const repos = yield call(API.fetchSubscriptions);
  const reposWithProps = repos.map(r => ({
    ...r,
    isSubscripted: true,
  }));
  yield put(Actions.setSubscriptions(reposWithProps));
}

export function* saga() {
  yield takeEvery(Types.SYSTEM_LAUNCH_APP, initialize);
}
