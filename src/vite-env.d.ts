/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FRONTIFY_ARTIFACT_DOMAIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
