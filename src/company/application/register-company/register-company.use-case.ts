import { CompanyRepository } from '../../domain/ports/company.repository';
import { CompanyFactory } from '../../domain/company.factory';
import { RegisterCompanyDto } from './register-company.dto';
import { CompanyAlreadyExistsError } from '../../domain/errors/company-already-exists.error';
import { CompanyName } from '../../domain/value-objects/company-name.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(command: RegisterCompanyDto): Promise<void> {
    const existing = await this.companyRepository.findByName(
      CompanyName.create(command.name),
    );

    if (existing) {
      throw new CompanyAlreadyExistsError(command.name);
    }

    const company = CompanyFactory.create(command);

    await this.companyRepository.save(company);
  }
}
