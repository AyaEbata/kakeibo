// TODO: 「合計教えて」って言ったら返してくれる

// 誰かが投稿したらbotが返す（適当にOutgoing WebHooksで設定した）
function doPost(e) {
  if (isSlackBot(e.parameter.user_id)) {
    return;
  }

  writeOnSpreadsheet();  // e.parameter.textを書く
  postToSlack();  // TODO: エラーの時は出さないようにする
}

function isSlackBot(userId) {
  return userId == "USLACKBOT";
}

function writeOnSpreadsheet() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(id);  // TODO: 月変わるごとに毎回指定しなきゃだから、直接指定やめる
  var sheet = spreadsheet.getSheetByName("支出");
  sheet.appendRow(["a", "b", "c"]);
}

function postToSlack() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token);
  //  slackApp.postMessage("#kakeibo", "記入完了したー！");  // 本番環境はこっち、Outgoing WebHooksの設定も戻す
  slackApp.postMessage("#bot_test_aya", "記入完了したー！");
}
