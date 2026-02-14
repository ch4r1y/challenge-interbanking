import { Company, BaseCompanyProps } from './company.entity';
import { CompanyType } from './enums/company-type.enum';

export class PymeCompany extends Company {
  private constructor(props: BaseCompanyProps) {
    super(props, CompanyType.PYME);
  }

  static create(props: BaseCompanyProps): Company {
    return new PymeCompany(props);
  }
}
