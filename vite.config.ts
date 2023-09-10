import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const jsonBinHeaders = {
        'X-Access-Key': env.VITE_JSON_BIN_KEY,
        'Content-Type': 'application/json',
    };

    return {
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
        server: {
            proxy: {
                '/api/projects': {
                    target: `https://api.jsonbin.io/`,
                    headers: jsonBinHeaders,
                    changeOrigin: true,
                    rewrite: () => env.VITE_JSON_BIN_PROJECTS,
                    configure: (proxy) => {
                        proxy.on('proxyReq', (proxyReq, req) => {
                            req.headers['X-Access-Key'] = jsonBinHeaders['X-Access-Key'];
                            req.headers['content-type'] = jsonBinHeaders['Content-Type'];
                        })
                    }
                },
                '/api/resume': {
                    target: 'https://api.jsonbin.io',
                    headers: jsonBinHeaders,
                    changeOrigin: true,
                    rewrite: () => env.VITE_JSON_BIN_RESUME,
                    configure: (proxy) => {
                        proxy.on('proxyReq', (proxyReq, req) => {
                            req.headers['X-Access-Key'] = jsonBinHeaders['X-Access-Key'];
                            req.headers['content-type'] = jsonBinHeaders['Content-Type'];
                        })
                    }
                },
                '/media': {
                    target: `https://storage.googleapis.com/`,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/media/, env.VITE_BUCKET),
                }
            }
        }
    }
});
