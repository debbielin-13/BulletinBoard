// ============================
// 佈告欄 API — Google Apps Script
// ============================
// 使用 Google Sheets 作為資料庫
// 部署為 Web App（執行身分：你自己；存取權：任何人）

const SHEET_NAME = "posts";

// ---------- 工具函式 ----------

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME);
}

function buildResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------- GET：取得所有公告 ----------

function doGet() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();

  // 第一列為標題列，跳過
  const posts = rows.slice(1).map(function(row) {
    return {
      id:      row[0],
      title:   row[1],
      message: row[2],
      author:  row[3],
      time:    row[4]
    };
  });

  return buildResponse({ success: true, data: posts });
}

// ---------- POST：新增公告 ----------

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const { title, message, author } = body;

  if (!title || !message || !author) {
    return buildResponse({ success: false, error: "缺少必要欄位" });
  }

  const sheet = getSheet();
  const id    = Utilities.getUuid();
  const time  = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });

  sheet.appendRow([id, title, message, author, time]);

  return buildResponse({ success: true, data: { id, title, message, author, time } });
}
