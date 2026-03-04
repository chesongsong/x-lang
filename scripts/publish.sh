#!/usr/bin/env bash
# 本地一键发布脚本：构建 → 更新版本（可选）→ 发布到 npm → 自动 commit + tag + push
# 使用方式：
#   ./scripts/publish.sh              # 自动将当前版本 patch + 1（如 0.0.2 -> 0.0.3），再发布
#   ./scripts/publish.sh 0.0.2        # 手动指定版本号并发布
#   ./scripts/publish.sh 0.0.2 --no-tag   # 发布 npm，但不做 commit/tag/push
#   ./scripts/publish.sh --dry-run    # 仅构建，不真正 publish / 不 git 操作
#
# 依赖（在 .env 中配置）：
#   NPM_TOKEN — npmjs.com Classic Automation Token

set -e
cd "$(dirname "$0")/.."
ROOT=$(pwd)

# 加载 .env（将 NPM_TOKEN 写在项目根目录 .env 中，已加入 .gitignore，勿提交）
if [ -f "$ROOT/.env" ]; then
  set -a
  # shellcheck source=/dev/null
  source "$ROOT/.env"
  set +a
fi

# 解析参数
NEW_VERSION=""
DRY_RUN=false
NO_TAG=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --no-tag)  NO_TAG=true ;;
    -h|--help)
      echo "用法: $0 [版本号] [--dry-run] [--no-tag]"
      echo "  版本号    如 0.0.2，会写入所有 packages/*/package.json"
      echo "  --dry-run 只构建，不真正 publish，不 git 操作"
      echo "  --no-tag  发布 npm 后不做 commit/tag/push"
      exit 0
      ;;
    *)
      if [[ "$arg" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        NEW_VERSION="$arg"
      fi
      ;;
  esac
done

echo "=========================================="
echo "  x-langjs 本地发布脚本"
echo "=========================================="

# 1. 计算目标版本（未指定则自动 patch + 1）
# 以子包发布版本为基准（core），避免根 package.json 的版本与子包版本体系不一致
BASE_VERSION=$(node -e "console.log(require('./packages/core/package.json').version)")
if [ -n "$NEW_VERSION" ]; then
  TARGET_VERSION="$NEW_VERSION"
  echo ">>> 使用手动指定版本: $TARGET_VERSION"
else
  TARGET_VERSION=$(node -e "
    const v = process.argv[1];
    const m = v.match(/^(\\d+)\\.(\\d+)\\.(\\d+)$/);
    if (!m) {
      console.error('根 package.json 版本号不是 x.y.z 格式: ' + v);
      process.exit(1);
    }
    const major = Number(m[1]);
    const minor = Number(m[2]);
    const patch = Number(m[3]) + 1;
    console.log([major, minor, patch].join('.'));
  " "$BASE_VERSION")
  echo ">>> 未指定版本号，自动 patch + 1: $BASE_VERSION -> $TARGET_VERSION"
fi

# 2. 将目标版本写入整个项目（根包 + playground + 所有子包）
echo ">>> 同步版本到所有 package.json: $TARGET_VERSION"
for f in package.json playground/package.json packages/*/package.json; do
  if [ -f "$f" ]; then
    node -e "
      const fs = require('fs');
      const p = JSON.parse(fs.readFileSync('$f', 'utf8'));
      p.version = '$TARGET_VERSION';
      fs.writeFileSync('$f', JSON.stringify(p, null, 2) + '\n');
    "
    echo "    已更新 $f"
  fi
done
CURRENT_VERSION="$TARGET_VERSION"

# 提前计算发布 tag，并在发布前检查是否冲突
RELEASE_TAG="v$CURRENT_VERSION"
if [ "$NO_TAG" = false ] && [ "$DRY_RUN" = false ]; then
  if git rev-parse "$RELEASE_TAG" >/dev/null 2>&1; then
    echo "错误: 本地已存在 tag $RELEASE_TAG，请先更换版本号后重试。"
    exit 1
  fi
  if git ls-remote --exit-code --tags origin "refs/tags/$RELEASE_TAG" >/dev/null 2>&1; then
    echo "错误: 远程已存在 tag $RELEASE_TAG，请先更换版本号后重试。"
    exit 1
  fi
fi

# 3. 安装依赖并构建
echo ""
echo ">>> 安装依赖..."
pnpm install --no-frozen-lockfile

echo ">>> 构建 types..."
pnpm --filter @x-langjs/types run build

echo ">>> 构建全部包（generate + tsc + bundle）..."
pnpm run build

echo ">>> 构建完成"
ls -la packages/core/dist/x-langjs.min.js 2>/dev/null || { echo "错误: x-langjs.min.js 未生成"; exit 1; }

# 4. 发布到 npmjs.com
if [ "$DRY_RUN" = true ]; then
  echo ""
  echo ">>> [dry-run] 跳过 npm publish"
else
  echo ""
  if [ -n "$NPM_TOKEN" ]; then
    echo ">>> 发布到 npm（使用 .env 中的 NPM_TOKEN）..."
    export NODE_AUTH_TOKEN="$NPM_TOKEN"
  else
    echo ">>> 发布到 npm（使用当前 npm 登录状态）..."
    echo "    若遇 403，请在 .env 中配置 NPM_TOKEN（Classic Automation Token）"
  fi
  pnpm publish -r --no-git-checks --access public
  echo ">>> npm 发布完成 ✓"
  echo "    查看: https://www.npmjs.com/package/@x-langjs/core"
fi

# 5. 默认自动 commit + tag + push（除非 --no-tag 或 --dry-run）
if [ "$NO_TAG" = false ] && [ "$DRY_RUN" = false ]; then
  echo ""
  echo ">>> 自动提交版本变更并打 tag $RELEASE_TAG ..."
  git add package.json playground/package.json packages/*/package.json pnpm-lock.yaml package-lock.json
  if git diff --staged --quiet 2>/dev/null; then
    echo "    无需提交的版本文件变更，跳过 commit"
  else
    git commit -m "chore: release $RELEASE_TAG"
  fi
  git tag "$RELEASE_TAG"
  echo ">>> 推送 main 与 tag $RELEASE_TAG 到远程（将触发 GitHub Release）..."
  git push origin main
  git push origin "$RELEASE_TAG"
  echo ">>> tag 推送完成 ✓"
fi

echo ""
echo "=========================================="
echo "  发布完成: v$CURRENT_VERSION"
echo "=========================================="
