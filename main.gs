// 誰かが投稿したらbotが返す（適当にOutgoing WebHooksで設定した）
function doPost(e) {
  if (isSlackBot(e.parameter.user_id)) {
    return;
  }

  writeOnSpreadsheet(format(e.parameter.text));
  postToSlack();
}

function isSlackBot(userId) {
  return userId == "USLACKBOT";
}

function format(text) {
  var originalData = text.split("\n");  // ["7/21","日用品", "108円", "100均一", ...]
  var date = originalData[0].split("/");  // ["7", "21"]
  var price = "¥" + originalData[2]
    .replace(/[^0-9]/g, '')
    .replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
  return [""]
    .concat(date)
    .concat([originalData[1], price])
    .concat(originalData.slice(3));  // ["", "7", "21","日用品", "¥108", "100均一", ...]
}

function writeOnSpreadsheet(formattedText) {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(id);
  var sheet = spreadsheet.getSheetByName("支出");
  sheet.appendRow(formattedText);
}

function postToSlack() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token);
  slackApp.postMessage("#kakeibo", "記入完了したー！");
  // slackApp.postMessage("#bot_test_aya", "記入完了したー！");  // テスト環境はこっち、Outgoing WebHooksの設定も戻す
}
