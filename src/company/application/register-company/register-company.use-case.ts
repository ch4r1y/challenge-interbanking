import { CompanyFactory } from '../../domain/company.factory';
import { RegisterCompanyDto } from './register-company.dto';
import { CompanyAlreadyExistsError } from '../../domain/errors/company-already-exists.error';
import { CompanyName } from '../../domain/value-objects/company-name.vo';
import { Injectable } from '@nestjs/common';
import { RegisterCompanyRepository } from '../../domain/ports/register-company-repository';

@Injectable()
export class RegisterCompanyUseCase {
  constructor(
    private readonly registerCompanyRepository: RegisterCompanyRepository,
  ) {}

  async execute(command: RegisterCompanyDto): Promise<void> {
    const existing = await this.registerCompanyRepository.findByName(
      CompanyName.create(command.name),
    );

    if (existing) {
      throw new CompanyAlreadyExistsError(command.name);
    }

    const company = CompanyFactory.create(command);

    await this.registerCompanyRepository.save(company);
  }
}
