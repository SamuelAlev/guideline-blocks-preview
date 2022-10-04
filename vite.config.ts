import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.');

    return {
        optimizeDeps: {
            exclude: ['brotli-wasm'],
        },
        build: {
            minify: true,
            sourcemap: true,
            assetsInlineLimit: 0,
        },
        plugins: [
            splitVendorChunkPlugin(),
            react(),
            Unocss({
                presets: [presetUno(), presetIcons()],
            }),
        ],
    };
});
