import {
  type ANTLRErrorListener,
  type RecognitionException,
  type Recognizer,
  type ATNSimulator,
} from "antlr4ng";
import { ParseError } from "@x-lang/types";

export class XLangErrorListener implements ANTLRErrorListener {
  public readonly errors: ParseError[] = [];

  syntaxError(
    _recognizer: Recognizer<ATNSimulator>,
    _offendingSymbol: unknown,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: RecognitionException | null,
  ): void {
    this.errors.push(
      new ParseError(
        `[${line}:${charPositionInLine}] ${msg}`,
        {
          start: { line, column: charPositionInLine, offset: 0 },
          end: { line, column: charPositionInLine, offset: 0 },
        },
      ),
    );
  }

  reportAmbiguity(): void {
    // intentionally empty — ambiguity reports are not treated as errors
  }

  reportAttemptingFullContext(): void {
    // intentionally empty
  }

  reportContextSensitivity(): void {
    // intentionally empty
  }
}
