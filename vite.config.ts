import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
    proxy: {
      '/api': 'http://localhost:3000'  // Redirige las solicitudes que empiezan con /api a localhost:3000
    }
  }
})
