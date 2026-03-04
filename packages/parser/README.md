# @x-langjs/parser

ANTLR4 lexer/parser package for x-langjs.

---

## 中文

### 包说明

`@x-langjs/parser` 提供词法分析与语法分析能力，输出 CST、token 流和解析错误。

### 安装

```bash
npm install @x-langjs/parser
```

### 主要导出

- `XLangLexer` / `XLangParser`
- `createLexer(source)`
- `tokenize(source)` -> `TokenInfo[]`
- `parse(source)` -> `ParseResult`
- `locationFromToken(token)`
- `AutoSemicolonTokenSource`

### 示例

```ts
import { parse, tokenize } from "@x-langjs/parser";

const tokens = tokenize("a = 1");
const result = parse("a = 1\nb = a + 2");
console.log(result.errors);
```

### 说明

此包返回 CST 级别结果。若需要 AST，请配合 `@x-langjs/ast` 使用。

---

## English

### Package purpose

`@x-langjs/parser` provides lexing/parsing and returns CST, token stream, and parse errors.

### Install

```bash
npm install @x-langjs/parser
```

### Main exports

- `XLangLexer` / `XLangParser`
- `createLexer(source)`
- `tokenize(source)` -> `TokenInfo[]`
- `parse(source)` -> `ParseResult`
- `locationFromToken(token)`
- `AutoSemicolonTokenSource`

### Example

```ts
import { parse, tokenize } from "@x-langjs/parser";

const tokens = tokenize("a = 1");
const result = parse("a = 1\nb = a + 2");
console.log(result.errors);
```
