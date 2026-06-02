
declare const process:
  | { env: Record<string, string | undefined> }
  | undefined;

const backendHost = typeof process !== 'undefined' && process.env["BACKEND_HOST"]
  ? process.env["BACKEND_HOST"]
  : "localhost";
const backendPort = typeof process !== 'undefined' && process.env["BACKEND_PORT"]
  ? process.env["BACKEND_PORT"]
  : "7075";


export const environment = {
  production: true,
  baseUrl: "http://" + backendHost + ":" + backendPort +  "/api"

};
