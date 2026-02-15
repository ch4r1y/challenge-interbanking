import { RegisterCompanyUseCase } from './register-company.use-case';
import { CompanyFactory } from '../../domain/company.factory';
import { RegisterCompanyDto } from './register-company.dto';
import { CompanyAlreadyExistsError } from '../../domain/errors/company-already-exists.error';
import { CompanyType } from '../../domain/enums/company-type.enum';
import { CompanyName } from '../../domain/value-objects/company-name.vo';
import { randomUUID } from 'node:crypto';
import { RegisterCompanyRepository } from '../../domain/ports/register-company-repository';

describe('RegisterCompanyUseCase', () => {
  const baseCommand: RegisterCompanyDto = {
    id: randomUUID(),
    name: 'Company name',
    type: CompanyType.PYME,
    adheredAt: new Date('2026-06-15T00:00:00.000Z'),
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createRepositoryMock = (): jest.Mocked<RegisterCompanyRepository> => ({
    save: jest.fn(),
    findByName: jest.fn(),
  });

  it('should save a new company when name is available', async () => {
    const repo = createRepositoryMock();
    repo.findByName.mockResolvedValue(null);

    const useCase = new RegisterCompanyUseCase(repo);

    await useCase.execute(baseCommand);

    expect(repo.findByName).toHaveBeenCalledWith(
      CompanyName.create(baseCommand.name),
    );

    expect(repo.save).toHaveBeenCalledTimes(1);
    expect(repo.save).toHaveBeenCalledWith(CompanyFactory.create(baseCommand));
  });

  it('should throw CompanyAlreadyExistsError when company name already exists', async () => {
    const repo = createRepositoryMock();
    repo.findByName.mockResolvedValue(CompanyFactory.create(baseCommand));

    const useCase = new RegisterCompanyUseCase(repo);

    await expect(useCase.execute(baseCommand)).rejects.toBeInstanceOf(
      CompanyAlreadyExistsError,
    );

    expect(repo.save).not.toHaveBeenCalled();
  });

  it('should normalized name for search and save', async () => {
    const denormalizeName = `  ${baseCommand.name}  `;
    const repo = createRepositoryMock();
    repo.findByName.mockResolvedValue(null);

    const useCase = new RegisterCompanyUseCase(repo);

    await useCase.execute({
      ...baseCommand,
      name: denormalizeName,
    });

    expect(repo.findByName).toHaveBeenCalledWith(
      CompanyName.create(baseCommand.name),
    );
    expect(repo.save).toHaveBeenCalledWith(CompanyFactory.create(baseCommand));
  });
});
