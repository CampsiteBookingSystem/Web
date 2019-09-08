import fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
  request: (url, config) => {
    return [url, config];
  },

  response: response => {
    return response;
  },
});

export default unregister;
