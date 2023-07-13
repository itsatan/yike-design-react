/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  appType: 'custom',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        javascriptEnabled: true,
        additionalData: (content) => {
          const imports = `@import "./src/styles/index.scss";`;

          // If there are @use statements, insert the import after the last one,
          // otherwise insert it before all content.
          const last = content.match(/@use (['"])[^'"]+\1;/g)?.at(-1);
          return last ? content.replace(last, `${last}\n${imports}`) : `${imports}\n${content}`;
        },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    lib: {
      entry: './src/index.ts',
      fileName: 'index',
      formats: ['es', 'umd'],
      name: 'Yk',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
