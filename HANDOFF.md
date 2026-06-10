# 作業引き継ぎ（Claude ↔ Cursor 共通）

このファイルは **Claude と Cursor の両方** が読み書きする、プロジェクトの共有メモです。
会話の履歴は引き継がれないため、ここに状態を残してください。

## 使い方

### セッション開始時（どちらの AI でも）
1. この `HANDOFF.md` を最初に読む
2. `git status` と `git log --oneline -5` で最新状態を確認する
3. 未コミットの変更があれば、前の担当 AI の作業の続きとみなす

### セッション終了時（どちらの AI でも）
1. 下の **現在の状態** を更新する
2. **直近の作業ログ** に 1 行追記する（日付・担当・内容）
3. 変更をコミットする（ユーザーが依頼した場合）

### ユーザーへの依頼テンプレ
```
HANDOFF.md を読んで続きから作業してください
```

---

## プロジェクト概要

- **リポジトリ**: WAC ポートフォリオサイト（Next.js 16 + shadcn/ui）
- **デプロイ**: Vercel（`master` へ push で自動デプロイ）
- **作品データ**: `lib/works.ts` の `works` 配列
- **画像配置**: `public/images/works/dayXXX.{png,jpg}`
- **ギャラリー**: `components/WorksSection.tsx` → `components/WorksGallery.tsx`（クリックでライトボックス拡大）
- **詳細ページ**: `app/works/[id]/page.tsx`（静的生成）

### 画像追加の手順
1. `public/images/works/dayXXX.png`（または `.jpg`）を追加
2. `lib/works.ts` にエントリを追加（id, src, title, date）
3. `git add` → `git commit` → `git push origin master`

---

## 現在の状態

**最終更新**: 2026-06-10（Cursor — Claude 作業の引き継ぎ完了）

### リポジトリ
- 最新コミット: `14ad748` Rename day11 to day011
- 作品登録: day001〜011（`lib/works.ts`）
- デプロイ済み: day009〜011 はリモートに push 済み

### 注意
- `day11.png` は `day011.png` の重複のため削除予定（`day011.png` を使用）

### 次にやること
- （未記入 — 次のセッションで更新）

### ブロッカー・決定事項
- Cursor の利用制限に達した場合、Claude で作業 → このファイルを更新 → Cursor で続行

---

## 直近の作業ログ

| 日付 | 担当 | 内容 |
|------|------|------|
| 2026-05-27 | Cursor | day006 追加、ライトボックス実装 |
| 2026-05-29 | Cursor | day007, day008 追加 |
| 2026-06-01頃 | Claude | day009〜011 追加、day11→day011 リネーム（推定） |
| 2026-06-10 | Cursor | HANDOFF.md 作成（引き継ぎ仕組み） |
| 2026-06-10 | Cursor | Claude 作業を引き継ぎ（works.ts 復元、HANDOFF 整備） |

---

## ファイル早見表

| 用途 | パス |
|------|------|
| 作品一覧データ | `lib/works.ts` |
| ギャラリー（拡大表示） | `components/WorksGallery.tsx` |
| トップの Works セクション | `components/WorksSection.tsx` |
| 作品詳細ページ | `app/works/[id]/page.tsx` |
| 画像 | `public/images/works/` |
| Cursor 向けルール | `AGENTS.md` |
| Claude 向けルール | `CLAUDE.md` |
