import {
  CommonToken,
  type CharStream,
  type Token,
  type TokenFactory,
  type TokenSource,
} from "antlr4ng";
import { XLangLexer } from "./generated/XLangLexer.js";

const STATEMENT_ENDING_TOKENS = new Set([
  XLangLexer.IDENTIFIER,
  XLangLexer.NUMBER,
  XLangLexer.STRING,
  XLangLexer.TRUE,
  XLangLexer.FALSE,
  XLangLexer.NULL,
  XLangLexer.RPAREN,
  XLangLexer.RBRACE,
  XLangLexer.RBRACKET,
  XLangLexer.BREAK,
  XLangLexer.CONTINUE,
  XLangLexer.RETURN,
]);

export class AutoSemicolonTokenSource implements TokenSource {
  private lastNonNewlineToken: Token | null = null;
  private pending: Token | null = null;
  private parenDepth = 0;
  private bracketDepth = 0;
  private braceStack: boolean[] = [];

  // 绑定词法分析器
  constructor(private readonly lexer: XLangLexer) {}

  // 读取下一个 token，必要时自动补分号
  nextToken(): Token {
    if (this.pending) {
      const token = this.pending;
      this.pending = null;
      return token;
    }

    while (true) {
      const token = this.lexer.nextToken();

      if (token.type === XLangLexer.EOF) {
        if (
          this.parenDepth === 0 &&
          this.bracketDepth === 0 &&
          !this.hasOpenObjectBrace() &&
          this.lastNonNewlineToken &&
          STATEMENT_ENDING_TOKENS.has(this.lastNonNewlineToken.type)
        ) {
          this.pending = token;
          this.lastNonNewlineToken = null;
          return this.createSemiToken(token);
        }
        return token;
      }

      if (token.type === XLangLexer.NEWLINE) {
        if (this.parenDepth > 0 || this.bracketDepth > 0 || this.hasOpenObjectBrace()) {
          continue;
        }
        if (
          this.lastNonNewlineToken &&
          STATEMENT_ENDING_TOKENS.has(this.lastNonNewlineToken.type)
        ) {
          return this.createSemiToken(token);
        }
        continue;
      }

      if (token.type === XLangLexer.LPAREN) this.parenDepth += 1;
      if (token.type === XLangLexer.RPAREN) this.parenDepth = Math.max(0, this.parenDepth - 1);
      if (token.type === XLangLexer.LBRACKET) this.bracketDepth += 1;
      if (token.type === XLangLexer.RBRACKET) this.bracketDepth = Math.max(0, this.bracketDepth - 1);
      if (token.type === XLangLexer.LBRACE) {
        const prevType = this.lastNonNewlineToken?.type;
        const isObject =
          prevType === XLangLexer.ASSIGN ||
          prevType === XLangLexer.COMMA ||
          prevType === XLangLexer.LPAREN ||
          prevType === XLangLexer.LBRACKET ||
          prevType === XLangLexer.COLON ||
          prevType === XLangLexer.RETURN;
        this.braceStack.push(isObject);
      }
      if (token.type === XLangLexer.RBRACE) {
        this.braceStack.pop();
      }

      this.lastNonNewlineToken = token;
      return token;
    }
  }

  private hasOpenObjectBrace(): boolean {
    return this.braceStack.some(Boolean);
  }

  // 以当前位置生成分号 token
  private createSemiToken(positionToken: Token): Token {
    const semi = CommonToken.fromType(XLangLexer.SEMI, ";");
    semi.line = positionToken.line;
    semi.column = positionToken.column;
    semi.start = positionToken.start;
    semi.stop = positionToken.start;
    semi.tokenIndex = -1;
    return semi;
  }

  // 当前行号
  get line(): number {
    return this.lexer.line;
  }

  // 当前列号
  get column(): number {
    return this.lexer.column;
  }

  // 返回输入流
  get inputStream(): CharStream | null {
    return this.lexer.inputStream;
  }

  // 返回输入源名称
  get sourceName(): string {
    return this.lexer.sourceName;
  }

  // 设置 token 工厂
  set tokenFactory(factory: TokenFactory<Token>) {
    this.lexer.tokenFactory = factory;
  }

  // 获取 token 工厂
  get tokenFactory(): TokenFactory<Token> {
    return this.lexer.tokenFactory;
  }
}
