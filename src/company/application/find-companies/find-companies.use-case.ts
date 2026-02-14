import { CompanyRepository } from '../../domain/ports/company.repository';
import { Injectable } from '@nestjs/common';
import { Company } from '../../domain/company.entity';
import { FilterType } from './filter-type';

@Injectable()
export class FindCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(filter: FilterType): Promise<Company[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const map = {
      [FilterType.TransferLastMonth]: () =>
        this.companyRepository.findWithTransfersSince(oneMonthAgo),
      [FilterType.AdheredLastMonth]: () =>
        this.companyRepository.findAdheredSince(oneMonthAgo),
    };

    return await map[filter]();
  }
}
