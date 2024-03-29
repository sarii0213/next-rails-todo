## セットアップ
- 参考
  - https://musclecoding.com/next-js-rails-todo-tutorial/
  - https://zenn.dev/kei178/articles/43172ba33eece4
<br>
   
1. `frontend`, `backend`２つのディレクトリに分けてフロントとバックエンドを管理していく
1. node, npmのインストール
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
   4. frontendディレクトリの.gitを削除
   5. frontendディレクトリの.gitignoreをルートに移動（ファイルのパス修正）
6. 