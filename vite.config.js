import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      tailwindcss(),
      react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.everysport.com', // ingen /v1 här
                changeOrigin: true,
                secure: true,
                // Byt ledande '/api' till '/v1' (utan regex)
                rewrite: (p) => p.startsWith('/api') ? '/v1' + p.slice(4) : p,
            },
        }}

})
