import * as React from 'react';
import VulpeeAPI from '@vulpee/js-api';

export interface AppContextInterface {
  vulpeeApi: VulpeeAPI;
}

const initialState: AppContextInterface = {
  vulpeeApi: new VulpeeAPI(),
};

const AppContext = React.createContext<AppContextInterface>(initialState);

export default AppContext;
