// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Si usas alias, asegúrate de que se refieran a la carpeta correcta en Florkpepe.
    },
  },
});
