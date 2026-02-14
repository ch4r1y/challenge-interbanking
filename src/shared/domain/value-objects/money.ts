import Decimal from 'decimal.js';

export class Money {
  private readonly value: Decimal;

  private constructor(value: Decimal) {
    this.value = value;
  }

  static create(value: string | number): Money {
    return new Money(new Decimal(value));
  }

  toString(): string {
    return this.value.toFixed(2);
  }

  equals(other: Money): boolean {
    return this.value.equals(other.value);
  }
}
