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
  },
  initialState,
);
