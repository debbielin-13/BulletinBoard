import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ★ 同仁填自己的 GAS Web App 網址（只需改這一行）
const GAS_EXEC_URL = 'https://script.google.com/macros/s/AKfycby2HuzieZLCTveJXnwenTmXhh1K_-YVKkNkIqx4skBfpW2V0ziCS9iPqSiWzImNLOCwbQ/exec'

export default defineConfig({
  plugins: [react()],
  base: '/BulletinBoard/',

  // 將 GAS_EXEC_URL 注入前端程式碼，讓 api/index.ts 可以使用
  define: {
    __API_ENDPOINT__: JSON.stringify(GAS_EXEC_URL),
  },

  // 開發時（npm run dev）透過 proxy 轉發，解決 CORS 問題
  server: {
    proxy: {
      '/api': {
        target: GAS_EXEC_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
