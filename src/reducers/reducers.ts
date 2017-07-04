import { combineReducers, Action } from 'redux';
import {
  searchResultsReducers,
  SearchResultsState,
} from './searchResultsReducers';
import { searchQueryReducers, SearchQueryState } from './searchQueryReducers';
import {
  subscriptionsReducers,
  SubscriptionsState,
} from './subscriptionsReducers';
export { Action };

export interface RootState {
  searchResults: SearchResultsState;
  searchQuery: SearchQueryState;
  subscriptions: SubscriptionsState;
}

export const rootReducer = combineReducers<RootState>({
  searchResults: searchResultsReducers,
  searchQuery: searchQueryReducers,
  subscriptions: subscriptionsReducers,
});
