/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Components from 'unplugin-react-components/vite';
import markdown from './plugins/vite-plugin-md';

export default defineConfig({
  plugins: [
    markdown(),
    react({
      include: [/\.tsx?$/i, /\.(md|markdown)$/i],
    }),
    Components({
      resolvers: [
        (componentName: string) => {
          if (componentName?.startsWith('Yk')) {
            return {
              name: componentName,
              from: fileURLToPath(new URL('../packages/yike-design/src/index.ts', import.meta.url)),
            };
          }
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.md', '.markdown'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: (content) => {
          const imports = `@import "../packages/yike-design/src/styles/index.scss";`;

          // If there are @use statements, insert the import after the last one,
          // otherwise insert it before all content.
          const last = content.match(/@use (['"])[^'"]+\1;/g)?.at(-1);
          return last ? content.replace(last, `${last}\n${imports}`) : `${imports}\n${content}`;
        },
        javascriptEnabled: true,
      },
    },
  },
});
