import { handleActions } from 'redux-actions';
import * as Types from '~/actions/actionTypes';

export interface SubscriptionsState {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  loading: boolean;
}
type SubscriptionsPayload = any;

const initialState: SubscriptionsState = {
  pagenation: {
    isFirstPage: true,
    isLastPage: true,
    page: 1,
  },
  repos: [],
  loading: false,
};

export const subscriptionsReducers = handleActions<
  SubscriptionsState,
  SubscriptionsPayload
>(
  {
    [Types.SYSTEM_LAUNCH_APP]: state => ({
      ...state,
      loading: true,
    }),
    [Types.REDUCER_SET_SUBSCRIPTION]: (state, action) => ({
      ...state,
      repos: [...action.payload],
      loading: false,
    }),
  },
  initialState,
);
