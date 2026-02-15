import { FindCompaniesUseCase } from './find-companies.use-case';
import { CompanyRepository } from '../../domain/ports/company.repository';
import { FilterType } from './filter-type';
import { CompanyFactory } from '../../domain/company.factory';
import { CompanyType } from '../../domain/enums/company-type.enum';
import { randomUUID } from 'node:crypto';
import { FilterTypeError } from '../../domain/errors/filter-type.error';

describe('FindCompaniesUseCase', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const createRepositoryMock = (): jest.Mocked<CompanyRepository> => ({
    save: jest.fn(),
    findByName: jest.fn(),
    findAdheredSince: jest.fn(),
    findWithTransfersSince: jest.fn(),
  });

  const baseCompanyParams = {
    id: randomUUID(),
    name: 'Company name',
    type: CompanyType.PYME,
    adheredAt: new Date('2026-02-15T00:00:00.000Z'),
  };

  it('should call findWithTransfersSince(oneMonthAgo) when filter is TransferLastMonth', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-15T00:00:00.000Z'));

    const repo = createRepositoryMock();
    const expected = [CompanyFactory.create(baseCompanyParams)];
    repo.findWithTransfersSince.mockResolvedValue(expected);

    const useCase = new FindCompaniesUseCase(repo);

    const results = await useCase.execute(FilterType.TransferLastMonth);

    expect(repo.findWithTransfersSince).toHaveBeenCalledTimes(1);
    expect(repo.findWithTransfersSince).toHaveBeenCalledWith(
      new Date('2026-01-15T00:00:00.000Z'), // 1 mes atrás
    );

    expect(repo.findAdheredSince).not.toHaveBeenCalled();
    expect(results).toBe(expected);
  });

  it('should call findAdheredSince(oneMonthAgo) when filter is AdheredLastMonth', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-15T00:00:00.000Z'));

    const repo = createRepositoryMock();
    const expected = [CompanyFactory.create(baseCompanyParams)];
    repo.findAdheredSince.mockResolvedValue(expected);

    const useCase = new FindCompaniesUseCase(repo);

    const result = await useCase.execute(FilterType.AdheredLastMonth);

    expect(repo.findAdheredSince).toHaveBeenCalledTimes(1);
    expect(repo.findAdheredSince).toHaveBeenCalledWith(
      new Date('2026-01-15T00:00:00.000Z'),
    );

    expect(repo.findWithTransfersSince).not.toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  it('should throw error when filter is invalid', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-07-15T12:00:00.000Z'));

    const repo = createRepositoryMock();
    const useCase = new FindCompaniesUseCase(repo);

    await expect(
      useCase.execute('invalid-filter' as FilterType),
    ).rejects.toBeInstanceOf(FilterTypeError);
  });
});
