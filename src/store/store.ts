import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, RootState } from '~/reducers/reducers';
import { saga } from '~/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<RootState> {
  const store: Store<RootState> = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(saga);
  return store;
}
