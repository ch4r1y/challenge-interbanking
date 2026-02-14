import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyOrmEntity } from '../company/company.orm-entity';

@Entity('transfers')
export class TransferOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  fromCompanyId!: string;

  @ManyToOne(() => CompanyOrmEntity, { nullable: false })
  @JoinColumn({ name: 'fromCompanyId' })
  fromCompany!: CompanyOrmEntity;

  @Column({ type: 'uuid' })
  toCompanyId!: string;

  @ManyToOne(() => CompanyOrmEntity, { nullable: false })
  @JoinColumn({ name: 'toCompanyId' })
  toCompany!: CompanyOrmEntity;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: string;

  @Column({ type: 'datetime' })
  createdAt!: Date;
}
