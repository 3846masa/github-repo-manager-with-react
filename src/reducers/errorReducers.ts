import { handleActions } from 'redux-actions';
import * as Types from '~/actions/actionTypes';

export type ErrorState = Error | null;
export type ErrorPayload = Error | null;

const initialState: ErrorState = null;

export const errorReducers = handleActions<ErrorState, ErrorPayload>(
  {
    [Types.USER_CONFIRM_ERROR_MODAL]: () => null,
    // tslint:disable-next-line:variable-name
    [Types.REDUCER_CAUSE_ERROR]: (_state, action) => action.payload,
  },
  initialState,
);
