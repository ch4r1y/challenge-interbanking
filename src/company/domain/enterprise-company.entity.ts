import { Company, BaseCompanyProps } from './company.entity';
import { CompanyType } from './enums/company-type.enum';

export class EnterpriseCompany extends Company {
  private constructor(props: BaseCompanyProps) {
    super(props, CompanyType.ENTERPRISE);
  }

  static create(props: BaseCompanyProps): Company {
    return new EnterpriseCompany(props);
  }
}
