import { Company } from '../company.entity';

export abstract class SearchCompanyRepository {
  abstract findAdheredSince(date: Date): Promise<Company[]>;
  abstract findWithTransfersSince(date: Date): Promise<Company[]>;
}
