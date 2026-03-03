import type { Expression, CallArgument } from "@x-lang/types";
import type { Xvalue } from "../values/base.js";
import type { Environment } from "../environment.js";

export interface Evaluator {
  evaluate(expr: Expression, env: Environment): Xvalue;
}

export interface BuiltinFunction {
  execute(
    args: readonly CallArgument[],
    env: Environment,
    evaluator: Evaluator,
  ): Xvalue;
}

export class BuiltinRegistry {
  private readonly builtins = new Map<string, BuiltinFunction>();

  register(name: string, fn: BuiltinFunction): void {
    this.builtins.set(name, fn);
  }

  has(name: string): boolean {
    return this.builtins.has(name);
  }

  get(name: string): BuiltinFunction | undefined {
    return this.builtins.get(name);
  }
}
