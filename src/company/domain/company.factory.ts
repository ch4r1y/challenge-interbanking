import { PymeCompany } from './pyme-company.entity';
import { EnterpriseCompany } from './enterprise-company.entity';
import { Company } from './company.entity';
import { CompanyType } from './enums/company-type.enum';
import { CompanyTypeError } from './errors/company-type.error';

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
        throw new CompanyTypeError(params.type);
    }
  }
}
