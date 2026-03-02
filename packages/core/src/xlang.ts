import {
  parse as parseCST,
  tokenize as lexTokenize,
} from "@x-lang/parser";
import type { TokenInfo } from "@x-lang/parser";
import { ASTBuilder, ScopeResolver } from "@x-lang/ast";
import { execute } from "@x-lang/interpreter";
import type { OutputSegment, ExecuteOptions, BuiltinFunction } from "@x-lang/interpreter";
import type { Program } from "@x-lang/types";
import { ParseError } from "@x-lang/types";
import { SourceSplitter } from "./splitter.js";
import type { RenderableDefinition } from "./define-renderable.js";

export interface ParseOptions {
  readonly sourceName?: string;
}

export interface RunOptions extends ParseOptions {
  readonly variables?: Record<string, unknown>;
  readonly builtins?: RenderableDefinition[];
}

export interface ParseOutput {
  readonly ast: Program;
  readonly errors: readonly ParseError[];
}

export interface RunOutput {
  readonly segments: readonly OutputSegment[];
  readonly errors: readonly ParseError[];
}

export function parse(source: string, _options?: ParseOptions): ParseOutput {
  const { tree, errors } = parseCST(source);

  if (errors.length > 0) {
    return {
      ast: { type: "Program", body: [], loc: { start: { line: 1, column: 0, offset: 0 }, end: { line: 1, column: 0, offset: 0 } } },
      errors,
    };
  }

  const builder = new ASTBuilder();
  const rawAst = builder.buildProgram(tree);

  const resolver = new ScopeResolver();
  const ast = resolver.resolve(rawAst);

  return { ast, errors: [] };
}

export function run(source: string, options?: RunOptions): RunOutput {
  const splitter = new SourceSplitter();
  const rawSegments = splitter.split(source);
  const outputSegments: OutputSegment[] = [];
  const allErrors: ParseError[] = [];
  let scopeIndex = 0;

  let builtinsMap: Map<string, BuiltinFunction> | undefined;
  if (options?.builtins && options.builtins.length > 0) {
    builtinsMap = new Map();
    for (const def of options.builtins) {
      builtinsMap.set(def.name, def.builtin);
    }
  }

  const execOptions: ExecuteOptions | undefined =
    options?.variables || builtinsMap
      ? { variables: options?.variables, builtins: builtinsMap }
      : undefined;

  for (const seg of rawSegments) {
    if (seg.type === "markdown") {
      outputSegments.push({ type: "markdown", content: seg.content });
      continue;
    }

    if (seg.type === "pending") {
      outputSegments.push({
        type: "pending",
        language: seg.language ?? "x-lang",
        content: seg.content,
      });
      continue;
    }

    const wrappedSource = "```" + seg.content + "```";
    const { ast, errors } = parse(wrappedSource, options);

    if (errors.length > 0) {
      allErrors.push(...errors);
      continue;
    }

    const scopeResults = execute(ast, execOptions);
    for (const result of scopeResults) {
      outputSegments.push({
        type: "scope",
        result: { ...result, index: scopeIndex++ },
      });
    }
  }

  return { segments: outputSegments, errors: allErrors };
}

export function tokenize(source: string): readonly TokenInfo[] {
  return lexTokenize(source);
}
