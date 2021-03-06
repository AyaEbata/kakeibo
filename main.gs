// 誰かが投稿したらbotが返す（適当にOutgoing WebHooksで設定した）
function doPost(e) {
  if (isSlackBot(e.parameter.user_id)) {
    return;
  }
  writeOnSpreadsheet(format(e.parameter.text));
  postToSlack("記入完了したー！");
}

function isSlackBot(userId) {
  return userId == "USLACKBOT";
}

function format(text) {
  var originalData = text.split("\n");  // ["7/21","日用品", "1080円", "100均一", ...]
  var date = convertToDateFormat(originalData[0]);  // ["7", "21"]
  var price = parseInt(originalData[2].replace(/[^0-9]/g, ''));  // 1080円 -> 1080
  return [""]
    .concat(date)
    .concat([originalData[1], price])
    .concat(originalData.slice(3));  // ["", "7", "21","日用品", "1080", "100均一", ...]
}

function convertToDateFormat(originalText) {
  /*
  // TODO: chromeで"7/21"渡した時と、gasで渡した時の結果が違う、、、
  // TODO: 日本語の月日の時
  var date = new Date(originalText);
  return [(date.getMonth() + 1).toString(), date.getDate().toString()];
  */
  return originalText.split("/");
}

function writeOnSpreadsheet(formattedText) {
  var month = formattedText[1]
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID_' + month);
  // var id = PropertiesService.getScriptProperties().getProperty('TEST_SPREADSHEET_ID_' + month);  // テスト環境
  
  if(!id) {
    postToSlack(month + "月のスプレッドシートが設定されてないよ><");    
    new Error();
  }
  
  var spreadsheet = SpreadsheetApp.openById(id);
  var sheet = spreadsheet.getSheetByName("支出");
  sheet.appendRow(formattedText);
}

function postToSlack(message) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token);
  slackApp.postMessage("#kakeibo", message);
  // slackApp.postMessage("#bot_test_aya", message);  // テスト環境はこっち、Outgoing WebHooksの設定も戻す
}
