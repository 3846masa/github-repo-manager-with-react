import { createAction } from 'redux-actions';
import * as Types from './actionTypes';

export const launchApp = createAction<void>(Types.SYSTEM_LAUNCH_APP);

export const setSubscriptions = createAction<any[], any[]>(
  Types.REDUCER_SET_SUBSCRIPTION,
  repos => repos,
);
