import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetIcons from '@unocss/preset-icons';

const htmlPlugin = (env: ReturnType<typeof loadEnv>) => {
    return {
        name: 'html-transform',
        transformIndexHtml: {
            enforce: 'pre' as const,
            transform: (html: string): string => html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
        },
    };
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.');

    return {
        optimizeDeps: {
            exclude: ['brotli-wasm'],
        },
        plugins: [
            react(),
            Unocss({
                presets: [
                    presetUno(),
                    presetWebFonts({
                        provider: 'google',
                        fonts: {
                            sans: 'Roboto',
                        },
                    }),
                    presetIcons(),
                ],
            }),
            htmlPlugin(env),
        ],
    };
});
