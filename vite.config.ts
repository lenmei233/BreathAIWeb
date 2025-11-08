import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 根据环境变量确定base路径
const getBasePath = () => {
  // GitHub Pages 需要仓库名前缀
  if (process.env.GITHUB_PAGES) {
    return '/BreathAIWeb/'
  }
  // Vercel, Netlify 等平台使用根路径
  return '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: getBasePath(),
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@fluentui/react-components'],
          markdown: ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
})
