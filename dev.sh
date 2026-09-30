#!/usr/bin/env bash
# 一键启动二开开发环境：后端 :3000 (SQLite) + 前端 :5173 (热更新)
# 用法：Git Bash 中在仓库目录执行  bash dev.sh   （Ctrl+C 一起停止）
set -e
cd "$(dirname "$0")"

export SESSION_COOKIE_SECURE=false

# go:embed web/dist 需要该目录存在（与官方 Dockerfile.dev 的做法一致）
mkdir -p web/dist
[ -f web/dist/index.html ] || echo '<!doctype html><html><head><title>dev</title></head><body>use frontend dev server</body></html>' > web/dist/index.html

echo ">> 启动后端  http://localhost:3000  (SQLite) ..."
go run main.go &
BACK_PID=$!
trap 'kill $BACK_PID 2>/dev/null' EXIT

echo ">> 启动前端  http://localhost:5173  (热更新，改代码自动刷新) ..."
cd web && bun run dev -- --host 0.0.0.0 --port 5173
