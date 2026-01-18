import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // ✅ permite acceder desde fuera del contenedor
    watch: {
      usePolling: true, // ✅ necesario en Docker para detectar cambios
      interval: 100,    // opcional: ajusta la frecuencia de polling
    },
    proxy: {
      '/api': {
        target: 'http://backend:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})