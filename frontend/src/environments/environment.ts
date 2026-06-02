declare const process:
  | { env: Record<string, string | undefined> }
  | undefined;

const backendHost = typeof process !== 'undefined' && process.env["BACKEND_HOST"]
  ? process.env["BACKEND_HOST"]
  : "localhost";
const backendPort = typeof process !== 'undefined' && process.env["BACKEND_PORT"]
  ? process.env["BACKEND_PORT"]
  : "7075";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://" + backendHost + ":" + backendPort + "/api"
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
