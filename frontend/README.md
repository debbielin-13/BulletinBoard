# Frontend — Vite + React + TypeScript

佈告欄前端，支援辦公室／教室／冰箱三種視覺主題。

## 專案結構

```
frontend/
├── src/
│   ├── components/
│   │   ├── BoardShell.tsx   # 佈告欄主體（含主題切換）
│   │   ├── Composer.tsx     # 張貼公告表單
│   │   └── PostCard.tsx     # 公告卡片
│   ├── data/
│   │   ├── initialPosts.ts  # 預設示範公告資料
│   │   └── themes.ts        # 主題設定（名稱、CSS class）
│   ├── types/
│   │   └── index.ts         # TypeScript 型別定義
│   ├── App.tsx / App.css    # 根元件與全域樣式
│   └── main.tsx             # 進入點
├── index.html
├── vite.config.ts
└── package.json
```

## 指令

```bash
npm install       # 安裝相依套件
npm run dev       # 啟動開發伺服器
npm run build     # 型別檢查 + 產出 dist/
npm run preview   # 本機預覽生產版本
npm run deploy    # build 後部署到 GitHub Pages
```

## Build 輸出

```
frontend/dist/
```

## GitHub Pages 部署

1. 確認 `vite.config.ts` 的 `base` 與 GitHub repo 名稱相符：

   ```ts
   base: '/BulletinBoard/',
   ```

2. 執行部署（需在 `frontend/` 目錄下）：

   ```bash
   npm run deploy
   ```

   會自動 build 並將 `dist/` 推送到 `gh-pages` 分支。

3. 前往 GitHub → repo → **Settings → Pages**，Branch 選 `gh-pages`，目錄選 `/ (root)`。

4. 約 1～2 分鐘後可透過以下網址存取：

   ```
   https://<你的帳號>.github.io/BulletinBoard/
   ```
