import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyOrmEntity } from './infrastructure/persistence/company/company.orm-entity';
import { CompanyController } from './infrastructure/http/company.controller';
import { RegisterCompanyUseCase } from './application/register-company/register-company.use-case';
import { CompanyRepository } from './domain/ports/company.repository';
import { CompanyRepositoryTypeorm } from './infrastructure/persistence/company/company.repository.typeorm';
import { TransferOrmEntity } from './infrastructure/persistence/transfer/transfer.orm-entity';
import { FindCompaniesUseCase } from './application/find-companies/find-companies.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyOrmEntity, TransferOrmEntity])],
  controllers: [CompanyController],
  providers: [
    RegisterCompanyUseCase,
    FindCompaniesUseCase,
    {
      provide: CompanyRepository,
      useClass: CompanyRepositoryTypeorm,
    },
  ],
})
export class CompanyModule {}
