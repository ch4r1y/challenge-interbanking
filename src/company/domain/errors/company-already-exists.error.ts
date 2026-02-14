import { DomainError } from '../../../shared/domain/errors/domain.error';

export class CompanyAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super(`Company with name "${name}" already exists`, 'COMPANY_NAME_ERROR');
  }
}
