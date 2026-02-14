import { validate as isUUID } from 'uuid';
import { UuidError } from '../errors/uuid.error';

export class Uuid {
  private constructor(private readonly value: string) {}

  static create(value: string): Uuid {
    if (!isUUID(value)) {
      throw new UuidError(`Company name "${value}" is too short`);
    }
    return new Uuid(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Uuid): boolean {
    return this.value === other.value;
  }
}
