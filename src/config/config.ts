import { Environment } from '@vulpee/js-api';

export const VULPEE_API_ENVIRONMENT: Environment =
  (process.env.REACT_APP_VULPEE_API_ENVIRONMENT as Environment) || 'production';
