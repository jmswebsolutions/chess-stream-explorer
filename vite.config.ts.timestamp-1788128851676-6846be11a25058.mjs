// vite.config.ts
import { defineConfig } from "file:///C:/projetos/chess-stream-explorer/node_modules/vite/dist/node/index.js";
import react from "file:///C:/projetos/chess-stream-explorer/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react()
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
  base: "/chess-stream-explorer/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZXRvc1xcXFxjaGVzcy1zdHJlYW0tZXhwbG9yZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2pldG9zXFxcXGNoZXNzLXN0cmVhbS1leHBsb3JlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamV0b3MvY2hlc3Mtc3RyZWFtLWV4cGxvcmVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuLy8gaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICAvLyBWaXRlUFdBKHtcbiAgICAvLyAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgIC8vICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLmljbycsICdwd2EtMTkyeDE5Mi5zdmcnLCAncHdhLTUxMng1MTIuc3ZnJ10sXG4gICAgLy8gICBtYW5pZmVzdDoge1xuICAgIC8vICAgICBuYW1lOiAnQ2hlc3MgU3RyZWFtIEV4cGxvcmVyJyxcbiAgICAvLyAgICAgc2hvcnRfbmFtZTogJ0NoZXNzIFN0cmVhbXMnLFxuICAgIC8vICAgICBkZXNjcmlwdGlvbjogJ0V4cGxvcmUgYW5kIHRyYWNrIGNoZXNzIHN0cmVhbWVycyBhY3Jvc3MgcGxhdGZvcm1zJyxcbiAgICAvLyAgICAgdGhlbWVfY29sb3I6ICcjMWExYTJlJyxcbiAgICAvLyAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMxYTFhMmUnLFxuICAgIC8vICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgLy8gICAgIG9yaWVudGF0aW9uOiAncG9ydHJhaXQnLFxuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogJ3B3YS0xOTJ4MTkyLnN2ZycsXG4gICAgLy8gICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgIC8vICAgICAgICAgdHlwZTogJ2ltYWdlL3N2Zyt4bWwnLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiAncHdhLTUxMng1MTIuc3ZnJyxcbiAgICAvLyAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgLy8gICAgICAgICB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6ICdwd2EtNTEyeDUxMi5zdmcnLFxuICAgIC8vICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9zdmcreG1sJyxcbiAgICAvLyAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICB9LFxuICAgIC8vICAgd29ya2JveDoge1xuICAgIC8vICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmcsd29mZix3b2ZmMn0nXSxcbiAgICAvLyAgICAgcnVudGltZUNhY2hpbmc6IFtcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2FwaVxcLmNoZXNzXFwuY29tXFwvLiovaSxcbiAgICAvLyAgICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxuICAgIC8vICAgICAgICAgb3B0aW9uczoge1xuICAgIC8vICAgICAgICAgICBjYWNoZU5hbWU6ICdjaGVzcy1hcGktY2FjaGUnLFxuICAgIC8vICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgLy8gICAgICAgICAgICAgbWF4RW50cmllczogMTAsXG4gICAgLy8gICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0LCAvLyAyNCBob3Vyc1xuICAgIC8vICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xuICAgIC8vICAgICAgICAgICAgIHN0YXR1c2VzOiBbMCwgMjAwXSxcbiAgICAvLyAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSksXG4gIF0sXG4gIGJhc2U6ICcvY2hlc3Mtc3RyZWFtLWV4cGxvcmVyLycsXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6ICcuL3NyYy90ZXN0L3NldHVwLnRzJyxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLG9CQUFvQjtBQUN4VCxPQUFPLFdBQVc7QUFJbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW1EUjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLEVBQ2Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
