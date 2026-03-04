# @x-langjs/types

Shared AST type definitions and error classes for x-langjs packages.

---

## 中文

### 包说明

`@x-langjs/types` 负责统一导出 AST 类型、位置类型和错误类型，供 parser/ast/interpreter/core 复用。

### 安装

```bash
npm install @x-langjs/types
```

### 主要导出

- AST 类型：`Program`、`ScopeBlock`、`Statement`、`Expression` 等
- 公共类型：`Position`、`SourceLocation`、`Parameter`、`Property`
- 错误类型：`XLangError`、`LexerError`、`ParseError`、`ASTBuildError`

### 示例

```ts
import type { Program, Expression } from "@x-langjs/types";
import { ParseError } from "@x-langjs/types";
```

---

## English

### Package purpose

`@x-langjs/types` exposes shared AST, source-location, and error types used by parser/ast/interpreter/core.

### Install

```bash
npm install @x-langjs/types
```

### Main exports

- AST types: `Program`, `ScopeBlock`, `Statement`, `Expression`, ...
- Common types: `Position`, `SourceLocation`, `Parameter`, `Property`
- Error classes: `XLangError`, `LexerError`, `ParseError`, `ASTBuildError`

### Example

```ts
import type { Program, Expression } from "@x-langjs/types";
import { ParseError } from "@x-langjs/types";
```
