/// <reference types="vitest" />>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        '**/*.d.ts',
        "src/test/",
        "**/*.config.js",
        "**/*.config.ts"
      ]
    }
  }
})
