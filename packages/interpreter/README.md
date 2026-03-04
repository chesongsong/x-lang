# @x-langjs/interpreter

Execution runtime and value domain for x-langjs AST programs.

---

## 中文

### 包说明

`@x-langjs/interpreter` 负责执行 AST，提供运行时环境、内置函数注册和值域系统。

### 安装

```bash
npm install @x-langjs/interpreter
```

### 主要导出

- `Interpreter`
- `execute(program, options)`
- `Environment`
- `BuiltinRegistry`
- 值域：`Xvalue`、`XNumber`、`XString`、`XBool`、`XNull`、`XArray`、`XObject`、`XFunction`、`XDate`
- `box(value)`（JS -> x-langjs 值）

### 示例

```ts
import { execute } from "@x-langjs/interpreter";

const results = execute(ast, {
  variables: { total: 100 },
});
```

---

## English

### Package purpose

`@x-langjs/interpreter` executes AST programs and provides runtime environment, builtins registry, and value-domain classes.

### Install

```bash
npm install @x-langjs/interpreter
```

### Main exports

- `Interpreter`
- `execute(program, options)`
- `Environment`
- `BuiltinRegistry`
- Value classes: `Xvalue`, `XNumber`, `XString`, `XBool`, `XNull`, `XArray`, `XObject`, `XFunction`, `XDate`
- `box(value)` for JS -> x-langjs conversion
