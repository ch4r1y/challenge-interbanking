import { Company, CompanyType } from './types/company';

const validTypes = Object.values(CompanyType);

const isCompany = (value: unknown): value is Company => {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    obj.name.length >= 3 &&
    typeof obj.type === 'string' &&
    validTypes.includes(obj.type as Company['type']) &&
    typeof obj.adheredAt === 'string' &&
    !isNaN(Date.parse(obj.adheredAt))
  );
};

export const parseCompanyInput = (input: unknown): Company => {
  if (!isCompany(input)) {
    throw new Error('Invalid Company payload');
  }

  return input;
};
