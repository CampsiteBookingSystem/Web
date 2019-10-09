import fetchIntercept from 'fetch-intercept';

import store from '../store';

export let unregister: any;

export function register() {
  unregister = fetchIntercept.register({
    request: (url, config) => {
      const {
        app: { token },
      } = store.getState();

      if (token) {
        const headersCopy = config && config.headers ? config.headers : {};

        return [
          url,
          {
            ...config,
            headers: {
              ...headersCopy,
              Authorization: `Bearer ${token}`,
            },
          },
        ];
      }

      return [url, config];
    },

    response: response => {
      return response;
    },
  });
}
