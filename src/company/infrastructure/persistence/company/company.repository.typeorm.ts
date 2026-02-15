import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CompanyOrmEntity } from './company.orm-entity';
import { CompanyName } from '../../../domain/value-objects/company-name.vo';
import { Company } from '../../../domain/company.entity';
import { CompanyMapper } from './company.mapper';
import { SearchCompanyRepository } from '../../../domain/ports/search-company-repository';
import { RegisterCompanyRepository } from '../../../domain/ports/register-company-repository';

@Injectable()
export class CompanyRepositoryTypeorm
  implements SearchCompanyRepository, RegisterCompanyRepository
{
  constructor(
    @InjectRepository(CompanyOrmEntity)
    private readonly repository: Repository<CompanyOrmEntity>,
  ) {}

  async findByName(name: CompanyName): Promise<Company | null> {
    const company = await this.repository.findOne({
      where: { name: name.getValue() },
    });
    return company ? CompanyMapper.toDomain(company) : null;
  }

  async save(company: Company): Promise<void> {
    await this.repository.save(CompanyMapper.toOrm(company));
  }

  async findAdheredSince(date: Date): Promise<Company[]> {
    const companies = await this.repository.find({
      where: {
        adheredAt: MoreThanOrEqual(date),
      },
    });

    return companies.map((company) => CompanyMapper.toDomain(company));
  }

  async findWithTransfersSince(date: Date): Promise<Company[]> {
    const companies = await this.repository
      .createQueryBuilder('company')
      .innerJoin('company.outgoingTransfers', 'transfer')
      .where('transfer.createdAt >= :date', { date })
      .getMany();

    return companies.map((company) => CompanyMapper.toDomain(company));
  }
}
