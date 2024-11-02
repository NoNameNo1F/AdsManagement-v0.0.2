/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MAP_API: string;
  readonly VITE_HTTP_URL: string;
  readonly VITE_HTTPS_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}