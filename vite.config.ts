import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

export default defineConfig({
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
        unocss({
            presets: [presetUno(), presetIcons()],
        }),
    ],
});
