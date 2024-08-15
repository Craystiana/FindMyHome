// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const API_URL = 'https://localhost:44362/api';
export const LOGIN_URL = '/user/login'; 
export const REGISTER_URL = '/user/register';
export const PROFILE_URL = '/user/profile';
export const LISTINGS_URL = '/listing/list';
export const LISTINGS_OWN_URL = '/listing/own';
export const LISTING_EDIT_URL = '/listing/edit';
export const LISTING_DATA_URL = '/listing/data';
export const LISTING_DELETE_URL = '/listing/delete?listingId=';
export const LISTING_DETAIL_URL = '/listing/detail';
export const FAVORITE_URL = '/favorite/list';
export const FAVORITE_ADD = '/favorite/add?listingId=';
export const FAVORITE_DELETE = '/favorite/delete?listingId=';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
