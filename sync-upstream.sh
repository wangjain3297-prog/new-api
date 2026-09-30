#!/usr/bin/env bash
# 同步上游 QuantumNous/new-api 的最新更新到本地（main 跟随上游，dev 合并上游改动）
# 用法：在 Git Bash 中进入仓库目录执行  bash sync-upstream.sh
set -euo pipefail
cd "$(dirname "$0")"

echo ">> 拉取上游更新（直连 GitHub）..."
if git fetch upstream --prune --tags; then
    SRC=upstream/main
else
    echo "!! 直连失败，改用镜像 gh-proxy.com ..."
    git fetch mirror --prune --tags
    SRC=mirror/main
fi

echo ">> 快进更新本地 main ..."
git checkout main
git merge --ff-only "$SRC"

echo ">> 切回 dev 并合并上游改动 ..."
git checkout dev
git merge main

echo ">> 推送到自己的 fork (origin) ..."
if git push origin main dev; then
    echo "   main 和 dev 已推送到 origin"
else
    echo "!! 推送失败（网络波动或权限问题）。本地同步已完成，稍后可手动执行: git push origin main dev"
fi

echo ""
echo ">> 完成！"
echo "   - 若上方出现 CONFLICT（冲突）：编辑冲突文件后 git add <文件>，再 git commit 完成合并"
echo "   - 若提示工作区有未提交改动导致切换失败：先 git stash 暂存，同步完再 git stash pop"
