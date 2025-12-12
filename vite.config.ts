import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),    
  ],
    server: {
    // Allow ngrok to access your dev server
    host: true,
    allowedHosts: [
      '.ngrok-free.app',  // Allow all ngrok subdomains
      'eb5f637a197d.ngrok-free.app',  // Your specific ngrok URL
    ],
    // Optional: Disable CORS for development
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
})
