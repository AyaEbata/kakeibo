# kakeibo
Slackから投稿すると、スプレッドシートの家計簿に投稿される。

## 仕様
### スプレッドシートの家計簿について
- スプレッドシートは、「支出」シートに以下のように記入する
- 「カテゴリ」の入力規則は「食費,日用品,水道,電気,ガス,ネット,交通費,その他,外食,娯楽」とする
- 「金額」の列は、メニューから「表示形式」→「数字」→「通過（端数切り捨て）」を設定しておくこと

| 月 | 日 | カテゴリ | 金額  | 購入場所 | カテゴリ詳細 | 備考 |
|----|----|--------|------|----------|------------|-----|
| 7  | 21 | 日用品  | ¥108 | 100均    |            |     |

### Slackからの投稿について
Slackからpostしてスプレッドシートの家計簿に記入したい場合、以下のように投稿する。

```
7/21
日用品
108円
100均一
```

「カテゴリ詳細」、「備考」に記入したい場合、同様にその下に付け足して投稿する。

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

## 開発メモ
- Outgoing WebhooksのTrigger Wordsを空で登録すると無限ループになる。
    - 自分の投稿に反応してbotが返信した場合、botの投稿にも反応してまたbotが投稿する、の無限ループになる。
