import { Injectable } from '@nestjs/common';
import { Company } from '../../domain/company.entity';
import { FilterType } from './filter-type';
import { FilterTypeError } from '../../domain/errors/filter-type.error';
import { SearchCompanyRepository } from '../../domain/ports/search-company-repository';

@Injectable()
export class FindCompaniesUseCase {
  constructor(
    private readonly searchCompanyRepository: SearchCompanyRepository,
  ) {}

  async execute(filter: FilterType): Promise<Company[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const handlers: Record<FilterType, () => Promise<Company[]>> = {
      [FilterType.TransferLastMonth]: () =>
        this.searchCompanyRepository.findWithTransfersSince(oneMonthAgo),
      [FilterType.AdheredLastMonth]: () =>
        this.searchCompanyRepository.findAdheredSince(oneMonthAgo),
    };

    const handler = handlers[filter];

    if (!handler) {
      throw new FilterTypeError(filter);
    }

    return handler();
  }
}
