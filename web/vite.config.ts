import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '127.0.0.1',
    port: 7101,
    proxy: {
      '/dev-api': {
        target: 'http://127.0.0.1:7102/',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      },
    }
  }
})
