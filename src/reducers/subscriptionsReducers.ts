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
    [Types.REDUCER_SET_WATCH_STATUS]: (state, action) => {
      const payload = action.payload;
      const repos = state.repos
        .map((r: any) => {
          const repo = { ...r };
          if (repo.id === payload.id) {
            repo.isSubscripted = payload.isSubscripted;
          }
          return repo;
        })
        .filter((r: any) => r.isSubscripted !== false);

      return {
        ...state,
        repos,
      };
    },
    [Types.REDUCER_ADD_SUBSCRIPTION]: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        repos: [payload, ...state.repos],
      };
    },
  },
  initialState,
);
