import { Company } from '../../../domain/company.entity';

export class CompanyResponseDto {
  static fromDomain(company: Company): CompanyResponseDto {
    return {
      id: company.id.getValue(),
      name: company.name.getValue(),
      type: company.type,
      adheredAt: company.adheredAt,
    };
  }
}
