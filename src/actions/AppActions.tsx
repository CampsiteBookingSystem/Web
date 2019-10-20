import { Dispatch } from 'redux';

import { VulpeeApi } from '../api';
import { handleError } from '../helpers';

export enum AppActionTypes {
  LOGIN = '@@app/LOGIN',
  LOGOUT = '@@app/LOGOUT',
  SET_TOKEN = '@@app/SET_TOKEN',

  FETCH_USER__REQUEST = '@@app/FETCH_USER__REQUEST',
  FETCH_USER__SUCCESS = '@@app/FETCH_USER__SUCCESS',
  FETCH_USER__FAIL = '@@app/FETCH_USER__FAIL',
}

export type AppActionType =
  | AppActionTypes.LOGIN
  | AppActionTypes.LOGOUT
  | AppActionTypes.SET_TOKEN
  | AppActionTypes.FETCH_USER__REQUEST
  | AppActionTypes.FETCH_USER__SUCCESS
  | AppActionTypes.FETCH_USER__FAIL;

export interface AppAction {
  type: AppActionType;
  payload?: any;
}

export const fetchUser = () => async (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: AppActionTypes.FETCH_USER__REQUEST });

  try {
    const data = await VulpeeApi.getInstance().getMe();

    dispatch({ type: AppActionTypes.FETCH_USER__SUCCESS, payload: data });
  } catch (exception) {
    dispatch({ type: AppActionTypes.FETCH_USER__FAIL });

    handleError(exception);
  }
};
