// Main.gs
// Web App 入口，通常不需要修改這裡
// 新增 GET API 時，在 GET_ROUTES 加一行即可

var GET_ROUTES = {
  "latest":  getLatestPost,
  "history": getHistory,
};

function doGet(e) {
  try {
    var action  = e.parameter.action;
    var handler = GET_ROUTES[action];
    if (!handler) return respond({ success: false, error: "未知的 action：" + action });
    return handler(e);
  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}

function doPost(e) {
  try {
    return createPost(e);
  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}
