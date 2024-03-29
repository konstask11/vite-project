// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        login: resolve(__dirname, 'login.html'),
        home: resolve(__dirname, 'home.html'),
      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});