import { Company } from '../company.entity';
import { CompanyName } from '../value-objects/company-name.vo';

export abstract class RegisterCompanyRepository {
  abstract findByName(name: CompanyName): Promise<Company | null>;
  abstract save(company: Company): Promise<void>;
}
