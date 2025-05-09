import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 2000,
    origin: 'https://chasmandu-ade3.onrender.com',
    cors: {
      origin: ["http://localhost:1000"],
    },
    proxy:{
      "/api":{
        target:"http://localhost:1000"
      }
    },
  },
})
