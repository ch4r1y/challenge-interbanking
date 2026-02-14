import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { Money } from '../../shared/domain/value-objects/money';

export interface TransferProps {
  id: string;
  fromCompanyId: string;
  toCompanyId: string;
  amount: string;
  createdAt: Date;
}

export class Transfer {
  id: Uuid;
  fromCompanyId: Uuid;
  toCompanyId: Uuid;
  amount: Money;
  createdAt: Date;

  private constructor(props: TransferProps) {
    this.id = Uuid.create(props.id);
    this.fromCompanyId = Uuid.create(props.fromCompanyId);
    this.toCompanyId = Uuid.create(props.toCompanyId);
    this.amount = Money.create(props.amount);
    this.createdAt = props.createdAt;
  }

  static create(props: TransferProps) {
    return new Transfer(props);
  }
}
