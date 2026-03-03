import type { Xvalue } from "./values/base.js";

export class Environment {
  private values = new Map<string, Xvalue>();

  constructor(private readonly parent?: Environment) {}

  define(name: string, value: Xvalue): void {
    this.values.set(name, value);
  }

  get(name: string): Xvalue {
    if (this.values.has(name)) {
      return this.values.get(name)!;
    }
    if (this.parent) {
      return this.parent.get(name);
    }
    throw new Error(`Undefined variable: ${name}`);
  }

  set(name: string, value: Xvalue): void {
    if (this.values.has(name)) {
      this.values.set(name, value);
      return;
    }
    if (this.parent) {
      this.parent.set(name, value);
      return;
    }
    throw new Error(`Undefined variable: ${name}`);
  }

  has(name: string): boolean {
    if (this.values.has(name)) return true;
    if (this.parent) return this.parent.has(name);
    return false;
  }
}
