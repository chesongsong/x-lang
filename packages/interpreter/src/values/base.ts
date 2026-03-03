export abstract class Xvalue {
  abstract get kind(): string;

  abstract unbox(): unknown;

  abstract toString(): string;

  isTruthy(): boolean {
    return true;
  }

  toNumber(): number {
    return 0;
  }
}
