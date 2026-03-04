import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/report-helper-demo/',
  server: {
    proxy: {
      '/api': {
        target: 'https://ai-api.harriscomputer.io',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
