import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // Corrected import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  workbox: {
        maximumFileSizeToCacheInBytes: 10000000, // Increases limit to 10MB
      },
  manifest: {
    name: 'HF APP',
    short_name: 'HF APP',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#42b883',
    lang: 'en',
    scope: '/',
    description: 'A progressive web app built with React and Vite',
    icons: [
      {
        src: '/icons/application.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/application.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
})
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://hfapi.herofashion.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})