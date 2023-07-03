import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@yike-design': path.resolve(__dirname, 'yike-design'),
		},
	},
	css: {
		preprocessorOptions: {
			// 全局样式引入
			scss: {
				additionalData: '@import "./yike-design/styles/index.scss";',
				javascriptEnabled: true,
			},
		},
	},
})
