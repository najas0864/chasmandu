import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: [
        'defaults',
        'not IE 11',
        'iOS >= 10',
        'Safari >= 10',
        'Android >= 5'
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
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
