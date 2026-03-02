# 部署 Playground 到 GitHub Pages

## 1. 启用 GitHub Pages

1. 打开仓库 **Settings** → **Pages**
2. 在 **Build and deployment** 中：
   - **Source** 选择 **GitHub Actions**

## 2. 推送代码触发部署

- 推送到 `main` 或 `master` 分支会自动触发 workflow，构建并部署 playground
- 或在 **Actions** 页选择 “Deploy to GitHub Pages” 后点击 **Run workflow** 手动执行

## 3. 访问地址

部署完成后访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

例如仓库为 `my-username/z-lang`，则地址为：**https://my-username.github.io/z-lang/**

## 本地测试带 base 的构建

若要在本地模拟 GitHub Pages 路径（如 `/z-lang/`）：

```bash
cd playground
VITE_BASE_PATH=/z-lang/ pnpm run build
pnpm run preview
```

然后访问终端里提示的地址（通常带 `/z-lang/` 路径）进行验证。
