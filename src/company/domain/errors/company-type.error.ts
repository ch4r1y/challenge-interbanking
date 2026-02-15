import { DomainError } from '../../../shared/domain/errors/domain.error';

export class CompanyTypeError extends DomainError {
  constructor(type: string) {
    super(`Company type: "${type}" is incorrect`, 'COMPANY_TYPE_ERROR');
  }
}
