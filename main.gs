// TODO: 「合計教えて」って言ったら今月の合計を返してくれるようにする
// TODO: スプレッドシートのid指定だと、月変わるごとに毎回指定しなきゃだから、直接指定やめる
// TODO: 「カテゴリ」で入力規則があればエラー出す
// TODO: 日付入れなかったら、今日の日付を入力してくれるようにする
// TODO: 日付、金額が違う形で投稿されても対応できるようにする
// TODO: 「記入完了したー！」って、エラーの時は違うの出すようにする
// TODO: 「◯月の合計教えて」って言ったら◯月の合計を返してくれるようにする

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

// TODO: リファクタ（雑すぎる
function format(text) {
  var splitText = text.split("\n");  // ["7/21","日用品", "108円", "100均一"]
  var date = splitText[0].split("/");  // ["7", "21"]
  splitText[2] = "¥" + splitText[2].slice(0, -1);
  splitText.shift()  // ["日用品", "¥108", "100均一"]
  date.unshift("")  // ["", "7", "21"]
  return date.concat(splitText);  // ["", "7", "21","日用品", "¥108", "100均一"]
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
