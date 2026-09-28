import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    fs: { allow: ['..'] },
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT || 5000}`,
    },
  },
});
