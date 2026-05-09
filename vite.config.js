import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/jr-racoes-site/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
