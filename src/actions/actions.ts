import { createAction } from 'redux-actions';
import * as Types from './actionTypes';

export const launchApp = createAction(Types.SYSTEM_LAUNCH_APP);
