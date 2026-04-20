# CLAUDE.md

## 專案性質：教學 / 工作坊

這是一個**教學用的簡易佈告欄專案**，給學員練習串接 Google Apps Script 後端 API。

`frontend/src/api/index.ts` 裡的 TODO（例如 `getLatestPost`、`getHistory` 等未實作函式）是**刻意留給學員動手實作**的練習題，不是遺漏。

**對 Claude 行為的影響：**
- 當使用者要求「串接 X API」時，只實作使用者指定的那一支，**不要順手把其他 TODO 也補完**。
- 若要建議改動未被提及的 TODO，先跟使用者確認。

## 常用指令

- 前端開發伺服器：`cd frontend && npm run dev`（透過 Vite proxy 轉發 `/api` 到 GAS，避免 CORS）
- 前端建置：`cd frontend && npm run build`
- 後端部署：`cd backend && clasp push`

## 語言慣例

使用者對話、UI 文案、程式註解、commit message 一律使用**繁體中文（zh-TW）**。Claude 的回覆也請使用繁體中文。
