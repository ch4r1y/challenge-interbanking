import { CompanyOrmEntity } from './company.orm-entity';
import { Company } from '../../../domain/company.entity';
import { CompanyFactory } from '../../../domain/company.factory';

export class CompanyMapper {
  static toOrm(entity: Company): CompanyOrmEntity {
    const orm = new CompanyOrmEntity();
    orm.id = entity.id.getValue();
    orm.name = entity.name.getValue();
    orm.adheredAt = entity.adheredAt;
    orm.type = entity.type;

    return orm;
  }

  static toDomain(orm: CompanyOrmEntity): Company {
    return CompanyFactory.create({
      id: orm.id,
      name: orm.name,
      adheredAt: orm.adheredAt,
      type: orm.type,
    });
  }
}
