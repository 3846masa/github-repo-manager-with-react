import { combineReducers, Action } from 'redux';
import {
  searchResultsReducers,
  SearchResultsState,
} from './searchResultsReducers';
import { searchQueryReducers, SearchQueryState } from './searchQueryReducers';
import { watchedListReducers, WatchedListState } from './watchedListReducers';
export { Action };

export interface RootState {
  searchResults: SearchResultsState;
  searchQuery: SearchQueryState;
  subscriptions: WatchedListState;
}

export const rootReducer = combineReducers<RootState>({
  searchResults: searchResultsReducers,
  searchQuery: searchQueryReducers,
  subscriptions: watchedListReducers,
});
