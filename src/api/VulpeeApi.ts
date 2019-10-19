import VulpeeAPI from '@vulpee/js-api';

import { VULPEE_API_ENVIRONMENT } from '../config';

export class VulpeeApi {
  public static getInstance(): VulpeeAPI {
    if (!VulpeeApi.instance) {
      VulpeeApi.instance = new VulpeeAPI({ environment: VULPEE_API_ENVIRONMENT, version: '1.0' });
    }

    return VulpeeApi.instance;
  }

  private static instance: VulpeeAPI;

  private constructor() {}
}
