/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    REACT_APP_DEFAULT_URL: string;
    REACT_APP_SIGNUP_URL: string;
  }
}
