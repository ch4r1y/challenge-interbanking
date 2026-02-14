import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CompanyType } from '../../../domain/enums/company-type.enum';
import { TransferOrmEntity } from '../transfer/transfer.orm-entity';

@Unique(['name'])
@Entity('companies')
export class CompanyOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'datetime' })
  adheredAt!: Date;

  @Column()
  type!: CompanyType;

  @OneToMany(() => TransferOrmEntity, (transfer) => transfer.fromCompany)
  outgoingTransfers!: TransferOrmEntity[];

  @OneToMany(() => TransferOrmEntity, (transfer) => transfer.toCompany)
  incomingTransfers!: TransferOrmEntity[];
}
