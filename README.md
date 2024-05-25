## セットアップ
- 参考
  - https://musclecoding.com/next-js-rails-todo-tutorial/
  - https://zenn.dev/kei178/articles/43172ba33eece4
<br>
  
### Next.js
1. `frontend`, `backend`２つのディレクトリに分けてフロントとバックエンドを管理していく
1. node, npmのインストール（nvmを使うのが良さそう [参考](https://qiita.com/ffggss/items/94f1c4c5d311db2ec71a)）
1. Next.jsのプロジェクト新規作成 
   - `npx create-next-app@latest --typescript frontend`
   - ```bash
      ✔ Would you like to use ESLint? … Yes
      ✔ Would you like to use Tailwind CSS? … Yes
      ✔ Would you like to use `src/` directory? … No
      ✔ Would you like to use App Router? (recommended) … No
      ✔ Would you like to customize the default import alias? … No    
     ```
1. ポート番号の設定（package.json > scripts.dev & scripts.start）
2. 動作確認 `npm run dev`
3. gitの調整
   1. frontendディレクトリの.gitを削除
   2. frontendディレクトリの.gitignoreをルートに移動（ファイルのパス修正）

### Rails
1. Ruby 3.1.4のインストール
   2. `brew upgrade rbenv ruby-bild`
      3. `rbenv install 3.1.4` -> build failed
         4. `ruby-build`に必要なパッケージが足りていなかったのかと思って参考記事のパッケージ全部入れたけど変わらずfail（[参考](https://github.com/rbenv/ruby-build/wiki#macos)）
         6. ```bash
            # rbenv install 3.1.4 build failure log
            
            readline.c:1903:37: error: use of undeclared identifier 'username_completion_function'; did you mean 'rl_username_completion_function'?
                                       rl_username_completion_function);
                                       ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                       rl_username_completion_function
            readline.c:79:42: note: expanded from macro 'rl_username_completion_function'
            # define rl_username_completion_function username_completion_function
                                                     ^
            /usr/local/opt/readline/include/readline/readline.h:494:14: note: 'rl_username_completion_function' declared here
            extern char *rl_username_completion_function (const char *, int);
            ^
            1 error generated.
            ```
         7. [Installation issues with Arm Mac (M1 Chip)](https://github.com/rbenv/ruby-build/discussions/1853#discussioncomment-1871744)を参考に、homebrew入れ直して解決
8. Bundlerのインストール `gem install bundler -v "2.3.15"`
9. Gemfile作成 `bundle init`
   ```ruby
   # Gemfileの中身
   source 'https://rubygems.org'

   gem 'rails', '~> 7.0.6'
   ```
10. `/.bundle`ディレクトリ下にGemをインストールするよう設定 `bundle config set path '.bundle'`
11. `bundle install`
    1. インストールしたgemの実行の際は、`bundle exec`をつけてBundlerで依存関係を解決するのを忘れずに
12. `bundle exec rails new backend --api --skip-bundle --skip-test --skip-turbolinks`
13. todo-backendディレクトリで、`bundle install`
    1. bundle install失敗したので、以下を実行して再度bundle installした　[参考](https://discuss.rubyonrails.org/t/cant-setup-rails-psych-yaml-issue/83968/12)
       ```bash
        gem install psych -- --with-libyaml-dir=/opt/homebrew/Cellar/libyaml/0.2.
       ```
14. `bundle exec rails s`でサーバ起動（フロントとバック両方でサーバ起動する必要あり）
15. rack-cors gemのインストール
    1. フロントエンドとバックエンド間の通信は、異なるオリジン間の通信となるので、RailsでNext.jsからのリクエストを許可するためにCORSの設定を行う必要がある
    2. `gem "rack-cors"`のコメントアウトを外して、`bundle install`
    3. initializers/cors.rbを`origins "localhost:3003"`に変更し、サーバ再起動
16. gitの調整
    1. backendディレクトリの.gitを削除
    2. backendディレクトリの.gitignoreをルートに移動（ファイルのパス修正）

### Next.jsとRailsの繋ぎ込み
1. RailsでAPIを実装
   1. model, controller, seed, routingを作成
2. Next.jsでUIを実装
   1. トップページ作成（pages/index.js）
   2. npm install axios (← JSでAPIと通信するためのライブラリ)
   3. 型定義の作成（例：types/Todo.ts） 
   4. コンポーネントの作成（例：components/Todo.tsx）
      - [useState](https://react.dev/reference/react/useState): 変数のstateを追加 with 初期値。戻り値のset functionは、stateを更新しre-renderを発火させる。
      - [useEffect](https://react.dev/reference/react/useEffect): コンポーネントがページに追加された時（＝マウントされた時）に実行される関数を定義。dependenciesに定義した変数が変わっていたら関数は実行される。他にも、componentのアンマウント、propsやstateの変更時などの副作用に対する操作を管理。
      - 動的ルーティング：`page/todos/[id]/index.tsx`のように、動的に変更されるURLの一部を[]で囲んでディレクトリ構成を作るとその通りにルーティングにも反映される
      - [useRouter](https://nextjs.org/docs/pages/api-reference/functions/use-router): ルーティング（画面遷移）を制御。`router.push`の引数で遷移先指定したり。
