// Posts.gs
// ★ 公告 API — 新增功能請在這裡複製區塊並修改
//
// 路由規則：
//   GET  ?action=latest   → 最新公告（第一筆）
//   GET  ?action=history  → 歷史訊息（第二筆之後）
//   POST                  → 發布新公告
//
// 新增 API 的步驟：
//   1. 在下方複製一個 GET / POST 區塊，修改邏輯
//   2. 在 Main.gs 的 GET_ROUTES 或 doPost 裡登記

// ── GET: 最新公告 ──────────────────────────────────────────

function getLatestPost() {
  var posts = getAllPosts();
  if (posts.length === 0) {
    return respond({ success: true, data: null });
  }
  return respond({ success: true, data: posts[0] });
}

// ── GET: 歷史訊息 ──────────────────────────────────────────

function getHistory() {
  var posts = getAllPosts();
  return respond({ success: true, data: posts.slice(1) });
}

// ── POST: 發布新公告 ───────────────────────────────────────

function createPost(e) {
  var body = JSON.parse(e.postData.contents);

  if (!body.title || !body.message || !body.author) {
    return respond({ success: false, error: "缺少必要欄位：title、message、author" });
  }

  var post = savePost(body.title, body.message, body.author);
  return respond({ success: true, data: post });
}
