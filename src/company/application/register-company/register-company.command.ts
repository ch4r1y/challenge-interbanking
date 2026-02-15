import { CompanyType } from '../../domain/enums/company-type.enum';

export interface RegisterCompanyCommand {
  id: string;
  name: string;
  type: CompanyType;
  adheredAt: Date;
}
