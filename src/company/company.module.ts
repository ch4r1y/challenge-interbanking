import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyOrmEntity } from './infrastructure/persistence/company/company.orm-entity';
import { CompanyController } from './infrastructure/http/company.controller';
import { RegisterCompanyUseCase } from './application/register-company/register-company.use-case';
import { CompanyRepositoryTypeorm } from './infrastructure/persistence/company/company.repository.typeorm';
import { TransferOrmEntity } from './infrastructure/persistence/transfer/transfer.orm-entity';
import { FindCompaniesUseCase } from './application/find-companies/find-companies.use-case';
import { RegisterCompanyRepository } from './domain/ports/register-company-repository';
import { SearchCompanyRepository } from './domain/ports/search-company-repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyOrmEntity, TransferOrmEntity])],
  controllers: [CompanyController],
  providers: [
    RegisterCompanyUseCase,
    FindCompaniesUseCase,
    {
      // en este punto se decide separar los providers para aplicar la I de SOLID (Es mejor tener muchas interfaces específicas que una sola interfaz de propósito general.)
      provide: RegisterCompanyRepository,
      useClass: CompanyRepositoryTypeorm,
    },
    {
      provide: SearchCompanyRepository,
      useClass: CompanyRepositoryTypeorm,
    },
  ],
})
export class CompanyModule {}
