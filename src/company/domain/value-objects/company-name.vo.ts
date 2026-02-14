import { CompanyNameError } from '../errors/company-name.error';

export class CompanyName {
  private constructor(private readonly value: string) {}

  static create(value: string): CompanyName {
    const normalized = value?.trim();

    if (!normalized || normalized.length < 3) {
      throw new CompanyNameError(value);
    }

    return new CompanyName(normalized);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CompanyName): boolean {
    return this.value === other.value;
  }
}
