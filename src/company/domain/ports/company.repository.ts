import { Company } from '../company.entity';
import { CompanyName } from '../value-objects/company-name.vo';

export abstract class CompanyRepository {
  abstract save(company: Company): Promise<void>;
  abstract findByName(name: CompanyName): Promise<Company | null>;
  abstract findAdheredSince(date: Date): Promise<Company[]>;
  abstract findWithTransfersSince(date: Date): Promise<Company[]>;
}
