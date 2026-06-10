<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 作業引き継ぎ（Claude との共有）

このプロジェクトは Claude と Cursor の両方で編集されます。会話履歴は共有されません。

**セッション開始時**
1. `HANDOFF.md` を読む
2. `git status` と `git log --oneline -5` で現状を確認する

**セッション終了時**
1. `HANDOFF.md` の「現在の状態」と「直近の作業ログ」を更新する
2. ユーザーが依頼した場合のみコミット・プッシュする

**画像追加時**
- `public/images/works/` に画像を置き、`lib/works.ts` にエントリを追加する
- デプロイは `git push origin master`（Vercel 自動デプロイ）
