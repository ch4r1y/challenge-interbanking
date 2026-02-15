import { CompanyRepository } from '../../domain/ports/company.repository';
import { Injectable } from '@nestjs/common';
import { Company } from '../../domain/company.entity';
import { FilterType } from './filter-type';
import { FilterTypeError } from '../../domain/errors/filter-type.error';

@Injectable()
export class FindCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(filter: FilterType): Promise<Company[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const handlers: Record<FilterType, () => Promise<Company[]>> = {
      [FilterType.TransferLastMonth]: () =>
        this.companyRepository.findWithTransfersSince(oneMonthAgo),
      [FilterType.AdheredLastMonth]: () =>
        this.companyRepository.findAdheredSince(oneMonthAgo),
    };

    const handler = handlers[filter];

    if (!handler) {
      throw new FilterTypeError(filter);
    }

    return handler();
  }
}
