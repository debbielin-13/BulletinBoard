# Backend — Google Apps Script

佈告欄 API，以 Google Apps Script 提供 GET / POST 端點，資料儲存於 Google Sheets。

## 專案結構

```
backend/
├── src/
│   ├── appsscript.json    # GAS 設定（時區、runtime、Web App 權限）
│   ├── Main.gs            # 入口 + 路由（少動）
│   ├── Posts.gs           # ★ 公告 API（新增功能在這裡）
│   └── Database.gs        # Sheets 讀寫（少動）
└── .clasp.json.example    # clasp 設定範本（複製後填入 scriptId）
```

## 前置準備

### 1. 安裝 clasp（Google 官方 GAS CLI）

```bash
npm install -g @google/clasp
```

### 2. 啟用 Apps Script API

前往 [script.google.com/home/usersettings](https://script.google.com/home/usersettings)，開啟「Google Apps Script API」。

### 3. 登入 Google 帳號

```bash
clasp login
```

執行後會開啟瀏覽器要求授權，完成後授權資訊存於 `~/.clasp.json`。

### 4. 建立 GAS 專案並取得 scriptId

1. 開啟 Google Sheets，建立新的試算表
2. 將工作表（左下角 tab）改名為 `posts`
3. 第一列填入標題：`id` `title` `message` `author` `time`
4. 上方選單「擴充功能」→「Apps Script」，進入綁定的 GAS 專案
5. 左側齒輪「專案設定」→ 複製「指令碼 ID」

### 5. 設定 .clasp.json

```bash
cp .clasp.json.example .clasp.json
# 用編輯器開啟 .clasp.json，將 YOUR_SCRIPT_ID_HERE 替換為實際 scriptId
```

## 部署流程

```bash
# 推送程式碼到 GAS 雲端
clasp push

# 在瀏覽器開啟 GAS 編輯器
clasp open
```

### 部署為 Web App 並取得 Endpoint

在 GAS 編輯器中：

1. 右上角「部署」→「新增部署」
2. 類型選「網路應用程式」
3. 執行身分：**我**；存取權：**所有人**
4. 按下「部署」，複製產生的網址 → 這就是你的 API endpoint

### 測試網址 vs 正式網址

| | 測試網址（`/dev`） | 正式網址（`/exec`） |
|---|---|---|
| 每次 `clasp push` 後 | 立即生效 | 需重新部署才更新 |
| 存取限制 | 僅部署者本人（需登入） | 所有人皆可存取 |
| 取得方式 | 「部署」→「測試部署」 | 「部署」→「管理部署」→ 複製網址 |
| 適合 | 自己開發測試 | 給他人使用 |

**教學建議：** 講師先部署一個正式版供全班共用，讓同仁先串接成功。之後同仁各自建立自己的 GAS 專案，再用測試網址開發。

## API 說明

| 方法 | 參數 | 說明 |
|------|------|------|
| `GET ?action=latest` | — | 取得最新公告（第一筆） |
| `GET ?action=history` | — | 取得歷史訊息（第二筆之後） |
| `GET ?action=count` | — | 取得公告總數 |
| `GET ?action=search&q=關鍵字` | `q` | 搜尋標題或內容 |
| `POST` | `{ title, message, author }` | 發布新公告 |

---

Base URL 範例：
```
https://script.google.com/macros/s/{SCRIPT_ID}/exec
```

---

### GET `?action=latest` — 最新公告

回傳第一筆公告。

```json
{
  "success": true,
  "data": {
    "id": "uuid-xxxx",
    "title": "影印機維護通知",
    "message": "本週五下午 3 點到 5 點，影印機將進行保養。",
    "author": "行政組",
    "time": "2026/4/19 上午 10:00:00"
  }
}
```

無公告時 `data` 為 `null`。

---

### GET `?action=history` — 歷史訊息

回傳第二筆之後的所有公告（陣列）。

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-yyyy",
      "title": "茶水間清潔提醒",
      "message": "請於離開前帶走個人物品。",
      "author": "總務組",
      "time": "2026/4/16 上午 10:00:00"
    }
  ]
}
```

---

### GET `?action=count` — 公告總數

```json
{
  "success": true,
  "data": { "count": 3 }
}
```

---

### GET `?action=search&q=關鍵字` — 搜尋公告

搜尋 `title` 或 `message` 包含關鍵字的公告（不分大小寫）。

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-xxxx",
      "title": "影印機維護通知",
      "message": "本週五下午 3 點到 5 點，影印機將進行保養。",
      "author": "行政組",
      "time": "2026/4/19 上午 10:00:00"
    }
  ]
}
```

未提供 `q` 時回傳錯誤：
```json
{ "success": false, "error": "請提供搜尋關鍵字 ?q=..." }
```

---

### POST — 發布新公告

Request body（JSON）：

```json
{
  "title": "停車場施工通知",
  "message": "本週三起停車場封閉施工，請改停路邊。",
  "author": "總務組"
}
```

成功回傳：

```json
{
  "success": true,
  "data": {
    "id": "uuid-zzzz",
    "title": "停車場施工通知",
    "message": "本週三起停車場封閉施工，請改停路邊。",
    "author": "總務組",
    "time": "2026/4/19 下午 02:30:00"
  }
}
```

缺少欄位時回傳錯誤：
```json
{ "success": false, "error": "缺少必要欄位：title、message、author" }
```

---

### 錯誤格式（通用）

```json
{ "success": false, "error": "錯誤原因說明" }
```

---

## Google Sheets 格式

工作表名稱需為 `posts`，欄位順序：

| A (id) | B (title) | C (message) | D (author) | E (time) |
|--------|-----------|-------------|------------|----------|
