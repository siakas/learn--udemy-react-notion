# React Notion Clone

React と TypeScript を使用したNotionクローンアプリケーションの学習プロジェクトです。ユーザー認証、ノート管理機能を備えたモダンなWebアプリケーションです。

## ✨ 主要機能

- 🔐 **ユーザー認証**: Supabaseを使用したユーザー登録・ログイン機能
- 📝 **ノート管理**: Notionライクなノート作成・編集機能（開発中）
- 🎨 **モダンUI**: Tailwind CSS + Radix UIを使用したレスポンシブデザイン
- ⚡ **リアルタイム**: Supabaseによるリアルタイムデータ同期（実装予定）

## 🛠️ 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全性のためのプログラミング言語
- **Vite** - 高速なビルドツール
- **React Router v7** - クライアントサイドルーティング

### スタイリング
- **Tailwind CSS v4** - ユーティリティファーストCSSフレームワーク
- **Radix UI** - アクセシブルなヘッドレスUIコンポーネント
- **Lucide React** - アイコンライブラリ

### 状態管理・データ
- **Jotai** - 軽量な状態管理ライブラリ
- **Supabase** - バックエンドサービス（認証・データベース）

### 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **TypeScript ESLint** - TypeScript用リンター

## 🚀 セットアップ手順

### 前提条件
- Node.js 22.17.0 以上（Voltaによる管理）
- pnpm パッケージマネージャー
- Supabaseアカウント

### インストール
```bash
# リポジトリのクローン
git clone <repository-url>
cd learn--udemy-react-notion

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local
# .env.localファイルでSupabaseの設定を行う
```

### 環境変数の設定
`.env.local`ファイルに以下の環境変数を設定してください：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_API_KEY=your_supabase_anon_key
```

### 開発サーバーの起動
```bash
pnpm dev
```

アプリケーションは `http://localhost:5173` で起動します。

## 📦 利用可能なコマンド

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# コードチェック
pnpm lint

# プレビューサーバー起動（ビルド後）
pnpm preview
```

## 📁 プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── Auth/           # 認証関連コンポーネント
│   ├── Form/           # フォームコンポーネント
│   ├── SideBar/        # サイドバーコンポーネント
│   └── ui/             # 基本UIコンポーネント
├── hooks/              # カスタムフック
├── lib/                # ユーティリティ・ライブラリ設定
│   ├── supabase.ts     # Supabase設定
│   └── utils.ts        # 汎用ユーティリティ
├── modules/            # 機能別モジュール
│   └── auth/           # 認証関連ロジック
│       ├── auth.repository.ts   # 認証API操作
│       └── current-user.state.ts # ユーザー状態管理
├── pages/              # ページコンポーネント
│   ├── Home.tsx        # ホームページ
│   ├── NoteDetail.tsx  # ノート詳細ページ
│   ├── Signin.tsx      # サインインページ
│   └── Signup.tsx      # サインアップページ
├── App.tsx             # メインアプリケーションコンポーネント
├── Layout.tsx          # レイアウトコンポーネント
└── main.tsx            # アプリケーションエントリーポイント
```

## 🔑 主要機能の説明

### 認証システム
- **ユーザー登録**: `src/pages/Signup.tsx`
- **ログイン**: `src/pages/Signin.tsx`
- **セッション管理**: Jotaiによる状態管理
- **認証ガード**: 未認証時の自動リダイレクト

### ルーティング
- `/` - ホームページ（認証必須）
- `/notes/:id` - ノート詳細ページ（認証必須）
- `/signin` - ログインページ
- `/signup` - 新規登録ページ

### 状態管理
- **Jotai**: 軽量で原子的な状態管理
- **ユーザー状態**: `src/modules/auth/current-user.state.ts`
- **リポジトリパターン**: データアクセス層の抽象化

## 🧪 開発情報

### コード規約
- ESLint設定による自動チェック
- Prettierによる自動フォーマット
- TypeScriptによる型安全性

### ビルド・デプロイ
```bash
# プロダクションビルド
pnpm build

# ビルドファイルのプレビュー
pnpm preview
```

### 推奨開発環境
- **IDE**: VS Code
- **拡張機能**: ESLint、Prettier、TypeScript、Tailwind CSS IntelliSense

## 📝 今後の開発予定

- [ ] ノート作成・編集機能の実装
- [ ] リッチテキストエディタの統合
- [ ] ファイルアップロード機能
- [ ] リアルタイム同期機能
- [ ] タグ・カテゴリ機能
- [ ] 検索機能の実装

## 🤝 貢献

このプロジェクトは学習目的で作成されています。改善提案やバグ報告は Issue または Pull Request でお知らせください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。