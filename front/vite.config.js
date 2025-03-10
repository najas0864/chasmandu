import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'chasmandu-ade3.onrender.com',
      'localhost',
      '0.0.0.0',
    ],
  },
})