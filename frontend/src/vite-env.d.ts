/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_W3M_PROJECT_ID: string;
    readonly VITE_ALCHEMY_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
