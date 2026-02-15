import { DomainError } from '../../../shared/domain/errors/domain.error';

export class FilterTypeError extends DomainError {
  constructor(type: string) {
    super(`Filter type: "${type}" is incorrect`, 'FILTER_TYPE_ERROR');
  }
}
