# @x-langjs/ast

AST building, traversal, and scope resolving utilities for x-langjs.

---

## 中文

### 包说明

`@x-langjs/ast` 负责将 parser 的 CST 构建为 AST，并做作用域解析与 AST 访问。

### 安装

```bash
npm install @x-langjs/ast
```

### 主要导出

- `ASTBuilder`
- `ScopeResolver`
- `visitNode`
- `ASTVisitor` 类型

### 示例

```ts
import { parse as parseCST } from "@x-langjs/parser";
import { ASTBuilder, ScopeResolver } from "@x-langjs/ast";

const { tree, errors } = parseCST("a = 1\nb = a + 2");
if (errors.length === 0) {
  const builder = new ASTBuilder();
  const rawAst = builder.buildProgram(tree);
  const ast = new ScopeResolver().resolve(rawAst);
  console.log(ast.body.length);
}
```

### 说明

此包不负责执行代码，执行请使用 `@x-langjs/interpreter`。

---

## English

### Package purpose

`@x-langjs/ast` converts CST to AST and provides scope resolving plus AST visiting helpers.

### Install

```bash
npm install @x-langjs/ast
```

### Main exports

- `ASTBuilder`
- `ScopeResolver`
- `visitNode`
- `ASTVisitor` type

### Example

```ts
import { parse as parseCST } from "@x-langjs/parser";
import { ASTBuilder, ScopeResolver } from "@x-langjs/ast";
```
