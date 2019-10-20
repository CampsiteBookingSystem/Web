import * as Redux from 'redux';
import { Establishment } from '@vulpee/js-api';

import { EstablishmentActionTypes } from '../actions';

export interface EstablishmentState {
  establishments: Establishment[];

  establishmentsLoading: boolean;
  establishmentsError: boolean;

  establishmentLoading: boolean;
  establishmentError: boolean;
}

export const establishmentInitialState: EstablishmentState = {
  establishments: [],

  establishmentsLoading: false,
  establishmentsError: false,

  establishmentLoading: false,
  establishmentError: false,
};

export function establishmentReducer(
  state: EstablishmentState = establishmentInitialState,
  action: Redux.AnyAction,
) {
  switch (action.type) {
    case EstablishmentActionTypes.FETCH_ESTABLISHMENTS__REQUEST:
      return {
        ...state,
        establishmentsLoading: true,
        establishmentsError: false,
      };

    case EstablishmentActionTypes.FETCH_ESTABLISHMENTS__SUCCESS:
      return {
        ...state,
        establishmentsLoading: false,
        establishments: action.payload,
      };

    case EstablishmentActionTypes.FETCH_ESTABLISHMENTS__FAIL:
      return {
        ...state,
        establishmentsLoading: false,
        establishmentsError: true,
      };

    case EstablishmentActionTypes.FETCH_ESTABLISHMENT__REQUEST:
      return {
        ...state,
        establishmentLoading: true,
        establishmentError: false,
      };

    case EstablishmentActionTypes.FETCH_ESTABLISHMENT__SUCCESS:
      return {
        ...state,
        establishmentLoading: false,
        establishments: state.establishments.map(establishment => {
          if (establishment.id === action.payload.id) {
            return action.payload;
          }

          return establishment;
        }),
      };

    case EstablishmentActionTypes.FETCH_ESTABLISHMENT__FAIL:
      return {
        ...state,
        establishmentLoading: false,
        establishmentError: true,
      };

    default:
      return { ...establishmentInitialState, ...state };
  }
}
