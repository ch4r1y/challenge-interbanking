import { DomainError } from '../../../shared/domain/errors/domain.error';

export class CompanyNameError extends DomainError {
  constructor(name: string) {
    super(`Company name: "${name}" is incorrect`, 'COMPANY_NAME_ERROR');
  }
}
