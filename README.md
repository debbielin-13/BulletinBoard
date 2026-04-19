# 簡易佈告欄系統

以 Vite + React + TypeScript 建構的一頁式佈告欄，支援多種視覺風格切換。

---

## 專案結構

```
BulletinBoard/
├── frontend/                # 前端專案
│   ├── src/
│   │   ├── components/
│   │   │   ├── BoardShell.tsx   # 佈告欄主體（含主題切換）
│   │   │   ├── Composer.tsx     # 張貼公告表單
│   │   │   └── PostCard.tsx     # 公告卡片
│   │   ├── data/
│   │   │   ├── initialPosts.ts  # 預設示範公告資料
│   │   │   └── themes.ts        # 主題設定（名稱、CSS class）
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript 型別定義
│   │   ├── App.tsx              # 根元件
│   │   ├── App.css              # 全域樣式（含主題 CSS）
│   │   ├── main.tsx             # 進入點
│   │   └── index.css            # Body 基礎樣式
│   ├── index.html               # HTML 入口
│   ├── vite.config.ts           # Vite 設定
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── package.json
├── README.md
└── .gitignore
```

---

## 指令

```bash
# 進入前端資料夾
cd frontend

# 安裝相依套件
npm install

# 啟動開發伺服器（本機預覽）
npm run dev

# 型別檢查 + 產出生產版本
npm run build

# 預覽生產版本
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

---

## Build 輸出位置

```
dist/
```

執行 `npm run build` 後，所有靜態檔案會輸出至 `frontend/dist/`。

---

## GitHub Pages 部署方式

### 前提：請先確認 `vite.config.ts` 的 `base` 與你的 repo 名稱相符

```ts
// vite.config.ts
export default defineConfig({
  base: '/BulletinBoard/', // ← 改成你的 GitHub repo 名稱
})
```

### 步驟

1. 確認程式碼已推送至 GitHub，repo 名稱為 `BulletinBoard`

2. 安裝套件（首次執行）：

   ```bash
   npm install
   ```

3. 執行部署：

   ```bash
   npm run deploy
   ```

   此指令會自動執行 `npm run build`，再將 `dist/` 資料夾的內容推送到 `gh-pages` 分支。

4. 前往 GitHub → 你的 repo → **Settings → Pages**

5. 將 **Source** 設定為 `Deploy from a branch`，Branch 選擇 **`gh-pages`**，目錄選 `/ (root)`

6. 儲存後約等 1～2 分鐘，網站即可透過以下網址存取：

   ```
   https://<你的 GitHub 帳號>.github.io/BulletinBoard/
   ```
