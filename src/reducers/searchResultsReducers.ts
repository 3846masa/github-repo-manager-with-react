import { handleActions } from 'redux-actions';
import * as Types from '~/actions/actionTypes';

export interface SearchResultsState {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  loading: boolean;
}
type SearchResultsPayload = any;

const initialState: SearchResultsState = {
  pagenation: {
    isFirstPage: true,
    isLastPage: true,
    page: 1,
  },
  repos: [],
  loading: false,
};

export const searchResultsReducers = handleActions<
  SearchResultsState,
  SearchResultsPayload
>(
  {
    [Types.USER_CHANGE_QUERY]: state => ({
      ...state,
      loading: true,
    }),
    [Types.REDUCER_START_SEARCHING]: state => ({
      ...state,
      loading: true,
    }),
    [Types.REDUCER_SET_SEARCH_RESULTS]: (state, action) => ({
      ...state,
      repos: [...action.payload],
      loading: false,
    }),
    [Types.REDUCER_SET_WATCH_STATUS]: (state, action) => {
      console.log(action);

      const payload = action.payload;
      const repos = state.repos.map((r: any) => {
        const repo = { ...r };
        if (repo.id === payload.id) {
          repo.isSubscripted = payload.isSubscripted;
        }
        return repo;
      });

      return {
        ...state,
        repos,
      };
    },
  },
  initialState,
);
