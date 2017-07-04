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
      pagenation: {
        page: 1,
        isFirstPage: true,
        isLastPage: action.payload.length <= 30,
      },
      loading: false,
    }),
    [Types.REDUCER_SET_WATCH_STATUS]: (state, action) => {
      const payload = action.payload;
      const repos = state.repos
        .map((r: any) => {
          const repo = { ...r };
          if (repo.id === payload.id) {
            repo.isSubscribed = payload.isSubscribed;
          }
          return repo;
        })
        .filter((r: any) => r.isSubscribed !== false);

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
    [Types.USER_CLICK_SUBSCRIPTIONS_PREV]: state => {
      const page = state.pagenation.page - 1;
      return {
        ...state,
        pagenation: {
          page,
          isFirstPage: page === 1,
          isLastPage: state.repos.length <= 30 * page,
        },
      };
    },
    [Types.USER_CLICK_SUBSCRIPTIONS_NEXT]: state => {
      const page = state.pagenation.page + 1;
      return {
        ...state,
        pagenation: {
          page,
          isFirstPage: page === 1,
          isLastPage: state.repos.length <= 30 * page,
        },
      };
    },
  },
  initialState,
);
