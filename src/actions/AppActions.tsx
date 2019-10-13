enum ActionTypes {
  LOGIN = '@@app/LOGIN',
  LOGOUT = '@@app/LOGOUT',
  SET_TOKEN = '@@app/SET_TOKEN',
}

export type AppActionType = ActionTypes.LOGIN | ActionTypes.LOGOUT | ActionTypes.SET_TOKEN;

export interface AppAction {
  type: AppActionType;
  payload?: any;
}

export default ActionTypes;
