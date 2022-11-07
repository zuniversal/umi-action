import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vitePluginCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginCompression()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': '/src/assets',
    },
  },
});
