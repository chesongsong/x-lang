# @x-langjs/core

Public SDK for x-langjs: parse, run, tokenize, app facade, custom component/renderable definitions, and convenient re-exports.

---

## 中文

### 包说明

`@x-langjs/core` 是推荐入口包，整合了解析、执行、渲染编排及常用类型导出。

### 安装

```bash
npm install @x-langjs/core
```

### 核心能力

- `parse(source)` -> AST + 错误
- `run(source, options)` -> 输出分段 + 错误
- `tokenize(source)` -> token 列表
- `XLangApp`：渲染应用门面
- `defineComponent`：注册组件关键字
- `defineRenderable`：注册可渲染关键字

### 示例

```ts
import { parse, run } from "@x-langjs/core";

const parsed = parse("a = 1\nb = a + 2\nb");
const executed = run(`
# report
\`\`\`x-langjs
total = 100
total
\`\`\`
`);

console.log(parsed.errors, executed.segments);
```

### UI 渲染示例

```ts
import { XLangApp } from "@x-langjs/core";

const app = new XLangApp(componentFactory);
app.provide({ total: 100 });
app.run(source, containerElement);
```

---

## English

### Package purpose

`@x-langjs/core` is the recommended entry package combining parse/execute/render orchestration APIs with common re-exports.

### Install

```bash
npm install @x-langjs/core
```

### Key APIs

- `parse(source)` -> AST + errors
- `run(source, options)` -> output segments + errors
- `tokenize(source)` -> token list
- `XLangApp`
- `defineComponent`
- `defineRenderable`
