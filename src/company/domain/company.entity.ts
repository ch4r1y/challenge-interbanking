import { CompanyName } from './value-objects/company-name.vo';
import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { CompanyType } from './enums/company-type.enum';

export interface BaseCompanyProps {
  id: string;
  name: string;
  adheredAt: Date;
}

export abstract class Company {
  id: Uuid;
  name: CompanyName;
  adheredAt: Date;
  type: CompanyType;

  protected constructor(props: BaseCompanyProps, type: CompanyType) {
    this.id = Uuid.create(props.id);
    this.name = CompanyName.create(props.name);
    this.adheredAt = props.adheredAt;
    this.type = type;
  }
}
