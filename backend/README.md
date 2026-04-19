# Backend — Google Apps Script

佈告欄 API，以 Google Apps Script 提供 GET / POST 端點，資料儲存於 Google Sheets。

## 專案結構

```
backend/
├── src/
│   └── main.gs              # API 主程式（doGet / doPost）
├── appsscript.json          # GAS 設定（時區、runtime、Web App 權限）
└── .clasp.json.example      # clasp 設定範本（複製後填入 scriptId）
```

## 前置準備

### 1. 安裝 clasp（Google 官方 GAS CLI）

```bash
npm install -g @google/clasp
```

### 2. 登入 Google 帳號

```bash
clasp login
```

執行後會開啟瀏覽器要求授權，完成後授權資訊存於 `~/.clasp.json`。

### 3. 在 Google Apps Script 建立專案並取得 scriptId

1. 前往 [script.google.com](https://script.google.com)，點「新增專案」
2. 進入「專案設定」，複製「指令碼 ID（Script ID）」

### 4. 設定 .clasp.json

```bash
cp .clasp.json.example .clasp.json
# 用編輯器開啟 .clasp.json，將 YOUR_SCRIPT_ID_HERE 替換為實際 scriptId
```

## 部署流程

```bash
# 推送程式碼到 GAS 雲端
clasp push

# 在瀏覽器開啟 GAS 編輯器（可在此手動部署為 Web App）
clasp open
```

### 部署為 Web App

在 GAS 編輯器中：

1. 右上角「部署」→「新增部署」
2. 類型選「網路應用程式」
3. 執行身分：**我**；存取權：**所有人**
4. 複製產生的 Web App 網址，貼到前端的 API 設定

## API 說明

| 方法 | 說明 |
|------|------|
| `GET /` | 取得所有公告，回傳 JSON 陣列 |
| `POST /` | 新增公告，Body 需含 `title`、`message`、`author` |

### Google Sheets 格式

工作表名稱需為 `posts`，欄位順序：

| A (id) | B (title) | C (message) | D (author) | E (time) |
|--------|-----------|-------------|------------|----------|
