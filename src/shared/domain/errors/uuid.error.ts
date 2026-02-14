import { DomainError } from './domain.error';

export class UuidError extends DomainError {
  constructor(message: string) {
    super(message, 'UUID_ERROR');
  }
}
