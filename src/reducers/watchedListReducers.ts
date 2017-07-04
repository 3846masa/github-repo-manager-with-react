import { handleActions } from 'redux-actions';
import * as Types from '~/actions/actionTypes';

export interface WatchedListState {
  pagenation: {
    isFirstPage: boolean;
    isLastPage: boolean;
    page: number;
  };
  repos: any[];
  loading: boolean;
}
type WatchedListPayload = any;

const initialState: WatchedListState = {
  pagenation: {
    isFirstPage: true,
    isLastPage: true,
    page: 1,
  },
  repos: [],
  loading: false,
};

export const watchedListReducers = handleActions<
  WatchedListState,
  WatchedListPayload
>({}, initialState);
