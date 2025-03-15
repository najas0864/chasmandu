import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 10000,
    origin: 'https://chasmandu-ade3.onrender.com',
    cors: {
      origin: ['https://chasmandu.onrender.com',"http://35.160.120.126:10000"],
    },
  },
})
