function postSlackMessage() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token);
  
  var channelId = "#kakeibo";
  var message = "テストおおおお";
  slackApp.postMessage(channelId, message);
}
