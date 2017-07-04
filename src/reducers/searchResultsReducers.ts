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
>({}, initialState);
