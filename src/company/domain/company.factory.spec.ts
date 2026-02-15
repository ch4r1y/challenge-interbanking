import { CompanyFactory } from './company.factory';
import { EnterpriseCompany } from './enterprise-company.entity';
import { PymeCompany } from './pyme-company.entity';
import { CompanyType } from './enums/company-type.enum';
import { randomUUID } from 'node:crypto';
import { CompanyTypeError } from './errors/company-type.error';
import { CompanyNameError } from './errors/company-name.error';
import { UuidError } from '../../shared/domain/errors/uuid.error';

describe('CompanyFactory', () => {
  const baseParams = {
    id: randomUUID(),
    name: 'Company name',
    adheredAt: new Date('2026-06-15T00:00:00.000Z'),
  };

  it('should create a PymeCompany when type is PYME', () => {
    const company = CompanyFactory.create({
      ...baseParams,
      type: CompanyType.PYME,
    });

    expect(company).toBeInstanceOf(PymeCompany);
    expect(company.type).toBe(CompanyType.PYME);
    expect(company.id.getValue()).toBe(baseParams.id);
    expect(company.name.getValue()).toBe(baseParams.name);
    expect(company.adheredAt).toEqual(baseParams.adheredAt);
  });

  it('should creates an EnterpriseCompany when type is ENTERPRISE', () => {
    const company = CompanyFactory.create({
      ...baseParams,
      type: CompanyType.ENTERPRISE,
    });

    expect(company).toBeInstanceOf(EnterpriseCompany);
    expect(company.type).toBe(CompanyType.ENTERPRISE);
  });

  it('should create a company with name normalized', () => {
    const denormalizeName = `  ${baseParams.name}  `;

    const company = CompanyFactory.create({
      ...baseParams,
      name: denormalizeName,
      type: CompanyType.ENTERPRISE,
    });

    expect(company.name.getValue()).toBe(baseParams.name);
  });

  it('should throws error when type is invalid', () => {
    expect(() =>
      CompanyFactory.create({
        ...baseParams,
        type: 'INVALID' as unknown as CompanyType,
      }),
    ).toThrow(CompanyTypeError);
  });

  it('should throw error when name is too short', () => {
    expect(() =>
      CompanyFactory.create({
        ...baseParams,
        type: CompanyType.PYME,
        name: 'ab',
      }),
    ).toThrow(CompanyNameError);
  });

  it('should throw error when id is invalid', () => {
    expect(() =>
      CompanyFactory.create({
        ...baseParams,
        id: 'invalid-id',
        type: CompanyType.PYME,
      }),
    ).toThrow(UuidError);
  });
});
