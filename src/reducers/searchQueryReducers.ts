import { handleActions } from 'redux-actions';
import * as Types from '~/actions/actionTypes';

export interface SearchQueryState {
  query: string;
  order: '' | 'stars' | 'forks' | 'updated';
  language: string;
}
type SearchQueryPayload = any;

const initialState: SearchQueryState = {
  query: '',
  order: '',
  language: '',
};

export const searchQueryReducers = handleActions<
  SearchQueryState,
  SearchQueryPayload
>({}, initialState);
