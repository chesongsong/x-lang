# @x-langjs/render

Rendering contracts and default render engine for x-langjs output segments.

---

## 中文

### 包说明

`@x-langjs/render` 提供渲染接口规范与默认渲染引擎 `RenderEngine`，负责把执行结果分段渲染到 DOM。

### 安装

```bash
npm install @x-langjs/render
```

### 主要导出

- 类型：`ComponentFactory`、`ComponentRenderer`、`ComponentHandle`、`RenderContext`
- 数据结构：`CodeBlockData`、`PendingData`
- 引擎：`RenderEngine`

### 示例

```ts
import { RenderEngine } from "@x-langjs/render";

const engine = new RenderEngine(factory);
engine.renderSegments(segments, errors, container, variables);
```

---

## English

### Package purpose

`@x-langjs/render` provides rendering interfaces and the default `RenderEngine` that renders output segments into DOM.

### Install

```bash
npm install @x-langjs/render
```

### Main exports

- Types: `ComponentFactory`, `ComponentRenderer`, `ComponentHandle`, `RenderContext`
- Data contracts: `CodeBlockData`, `PendingData`
- Engine: `RenderEngine`
