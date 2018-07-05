# kakeibo
Slackから入力するとスプレッドシートに記入される家計簿

## ソースをGoogle App Scriptで動かすための設定
### SlackのLibraryを追加する
メニューから「リソース」→「ライブラリ」選択し、Library Keyを入力する。
SlackAppのLibrary Key →　M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO

### Tokenを取得する
1. https://api.slack.com/apps でappを作成
2. タブからInstall Appに移動
3. Bot User OAuth Access TokenのTokenを取得

### Tokenをプロパティに登録する（ソースコードに埋め込みたくないから）
メニューの「ファイル」→「プロジェクトのプロパティ」→「スクリプトのプロパティ」からSLACK_ACCESS_TOKENとTokenを保存する。

## GASからGithubを操作するための設定
### 使うもの
Google Apps Script GitHub アシスタント（Chrome拡張）
https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=ja

### Tokenを取得する
https://github.com/settings/tokens から作って取得する。

## 公開する
Webhookを使ってるので、公開の作業が必要。
メニューの「公開」→「ウェブアプリケーションとして導入」でプロジェクトバージョンを新規作成で保存する。
