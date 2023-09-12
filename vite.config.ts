import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            drafts: {
                nesting: true,
                customMedia: true,
            },
        },
    },
    build: {
        cssMinify: 'lightningcss',
    },
    publicDir: 'static',
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    assetsInclude: [
        'src/__mocks__/media/**/*',
    ],
});
