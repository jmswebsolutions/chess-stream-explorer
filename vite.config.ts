import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'pwa-192x192.svg', 'pwa-512x512.svg'],
    //   manifest: {
    //     name: 'Chess Stream Explorer',
    //     short_name: 'Chess Streams',
    //     description: 'Explore and track chess streamers across platforms',
    //     theme_color: '#1a1a2e',
    //     background_color: '#1a1a2e',
    //     display: 'standalone',
    //     orientation: 'portrait',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.svg',
    //         sizes: '192x192',
    //         type: 'image/svg+xml',
    //       },
    //       {
    //         src: 'pwa-512x512.svg',
    //         sizes: '512x512',
    //         type: 'image/svg+xml',
    //       },
    //       {
    //         src: 'pwa-512x512.svg',
    //         sizes: '512x512',
    //         type: 'image/svg+xml',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
    //     runtimeCaching: [
    //       {
    //         urlPattern: /^https:\/\/api\.chess\.com\/.*/i,
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'chess-api-cache',
    //           expiration: {
    //             maxEntries: 10,
    //             maxAgeSeconds: 60 * 60 * 24, // 24 hours
    //           },
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
  base: '/chess-stream-explorer/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
