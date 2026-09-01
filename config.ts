/**
 * Backend environment config. Switch ENVIRONMENT to change where API calls go.
 */

export type Environment = "local" | "prod" | "mock";

const ENVIRONMENT = "prod" as Environment;

const LOCAL_URL = "http://localhost:8080";
const PROD_URL = "https://pos-backend-production-1ad2.up.railway.app";

export const BASE_URL = ENVIRONMENT === "local" ? LOCAL_URL : PROD_URL;

/** When true, clients should skip real network calls and return mock data (useful for testing on-device without ngrok). */
export const IS_MOCK = ENVIRONMENT === "mock";
