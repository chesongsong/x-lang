import type { Xvalue } from "./values/base.js";

export class ReturnSignal {
  constructor(public readonly value: Xvalue) {}
}

export class BreakSignal {}

export class ContinueSignal {}
