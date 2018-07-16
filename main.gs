// 誰かが投稿したらbotが返す（適当にOutgoing WebHooksで設定した）
function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token);
  var channel = "#kakeibo";

  if (isSlackBot(e.parameter.user_id)) {
    return;
  }
  slackApp.postMessage(channel, e.parameter.text);
}

function isSlackBot(userId) {
  return userId == "USLACKBOT";
}