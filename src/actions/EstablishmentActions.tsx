import { Dispatch } from 'redux';

import { VulpeeApi } from '../api';
import { handleError } from '../helpers';

export enum EstablishmentActionTypes {
  FETCH_ESTABLISHMENTS__REQUEST = '@@establishment/FETCH_ESTABLISHMENTS__REQUEST',
  FETCH_ESTABLISHMENTS__SUCCESS = '@@establishment/FETCH_ESTABLISHMENTS__SUCCESS',
  FETCH_ESTABLISHMENTS__FAIL = '@@establishment/FETCH_ESTABLISHMENTS__FAIL  ',

  FETCH_ESTABLISHMENT__REQUEST = '@@establishment/FETCH_ESTABLISHMENT__REQUEST',
  FETCH_ESTABLISHMENT__SUCCESS = '@@establishment/FETCH_ESTABLISHMENT__SUCCESS',
  FETCH_ESTABLISHMENT__FAIL = '@@establishment/FETCH_ESTABLISHMENT__FAIL  ',
}

export type EstablishmentActionType =
  | EstablishmentActionTypes.FETCH_ESTABLISHMENTS__REQUEST
  | EstablishmentActionTypes.FETCH_ESTABLISHMENTS__SUCCESS
  | EstablishmentActionTypes.FETCH_ESTABLISHMENTS__FAIL
  | EstablishmentActionTypes.FETCH_ESTABLISHMENT__REQUEST
  | EstablishmentActionTypes.FETCH_ESTABLISHMENT__SUCCESS
  | EstablishmentActionTypes.FETCH_ESTABLISHMENT__FAIL;

export interface EstablishmentAction {
  type: EstablishmentActionType;
  payload?: any;
}

export const fetchEstablishments = () => async (dispatch: Dispatch<EstablishmentAction>) => {
  dispatch({ type: EstablishmentActionTypes.FETCH_ESTABLISHMENTS__REQUEST });

  try {
    const data = await VulpeeApi.getInstance().getEstablishments();

    dispatch({ type: EstablishmentActionTypes.FETCH_ESTABLISHMENTS__SUCCESS, payload: data });
  } catch (exception) {
    dispatch({ type: EstablishmentActionTypes.FETCH_ESTABLISHMENTS__FAIL });

    handleError(exception);
  }
};

export const fetchEstablishment = (id: number) => async (
  dispatch: Dispatch<EstablishmentAction>,
) => {
  dispatch({ type: EstablishmentActionTypes.FETCH_ESTABLISHMENT__REQUEST });

  try {
    const data = await VulpeeApi.getInstance().getEstablishment(id);

    dispatch({ type: EstablishmentActionTypes.FETCH_ESTABLISHMENT__SUCCESS, payload: data });
  } catch (exception) {
    dispatch({ type: EstablishmentActionTypes.FETCH_ESTABLISHMENT__FAIL });

    handleError(exception);
  }
};
