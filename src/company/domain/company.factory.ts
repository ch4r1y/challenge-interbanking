import { PymeCompany } from './pyme-company.entity';
import { EnterpriseCompany } from './enterprise-company.entity';
import { Company } from './company.entity';
import { CompanyType } from './enums/company-type.enum';

interface CreateCompanyParams {
  id: string;
  name: string;
  type: CompanyType;
  adheredAt: Date;
}

export class CompanyFactory {
  static create(params: CreateCompanyParams): Company {
    switch (params.type) {
      case CompanyType.PYME:
        return PymeCompany.create(params);

      case CompanyType.ENTERPRISE:
        return EnterpriseCompany.create(params);

      default:
        throw new Error('Invalid company type');
    }
  }
}
