/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_DEV: string;
  readonly VITE_API_VERSION: string;
  VITE_TOKEN_AGE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
