import fetchIntercept from 'fetch-intercept';

export let unregister: any;

export function register() {
  unregister = fetchIntercept.register({
    request: (url, config) => {
      return [url, config];
    },

    response: response => {
      return response;
    },
  });
}
