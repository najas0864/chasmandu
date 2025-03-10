import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'chasmandu-ade3.onrender.com', // add the Render host here
      'localhost',  // (optional) allow localhost for development
      '0.0.0.0',    // allow all IPs
    ],
  },
})