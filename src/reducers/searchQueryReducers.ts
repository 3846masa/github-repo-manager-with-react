import { handleActions } from 'redux-actions';
import * as Types from '~/actions/actionTypes';

export interface SearchQueryState {
  query: string;
  sort: '' | 'stars' | 'forks' | 'updated';
  language: string;
}
export interface SearchQueryPayload {
  query?: string;
  sort?: '' | 'stars' | 'forks' | 'updated';
  language?: string;
}

const initialState: SearchQueryState = {
  query: '',
  sort: '',
  language: '',
};

export const searchQueryReducers = handleActions<
  SearchQueryState,
  SearchQueryPayload
>(
  {
    [Types.USER_CHANGE_QUERY]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  initialState,
);
