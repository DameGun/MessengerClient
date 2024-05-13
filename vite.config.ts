import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@customTypes': path.resolve(__dirname, './src/types'),
      '@services': path.resolve(__dirname, './src/services'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@router': path.resolve(__dirname, './src/router'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
      '@state': path.resolve(__dirname, './src/services/redux'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@helpers': path.resolve(__dirname, './src/helpers')
    }
  }
})
