import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterCompanyUseCase } from '../../application/register-company/register-company.use-case';
import { CompanyResponseDto } from './dtos/company.response.dto';
import { CompanyQueryDto } from './dtos/company-query.dto';
import { FindCompaniesUseCase } from '../../application/find-companies/find-companies.use-case';
import { FilterType } from '../../application/find-companies/filter-type';
import { RegisterCompanyDto } from './dtos/register-company.dto';

@ApiTags('company')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly registerCompanyUseCase: RegisterCompanyUseCase,
    private readonly findCompaniesUseCase: FindCompaniesUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene empresas filtradas por el parametro filter ',
    description:
      'Permite obtener empresas que realizaron transferencias en el último mes o que se adhirieron en el último mes.',
  })
  @ApiQuery({
    name: 'filter',
    required: true,
    enum: FilterType,
    description: `Valores posibles: ${Object.values(FilterType).join(' | ')}`,
  })
  @ApiOkResponse({
    description: 'Lista de empresas',
    type: CompanyResponseDto,
    isArray: true,
  })
  async findCompanies(
    @Query() query: CompanyQueryDto,
  ): Promise<CompanyResponseDto[]> {
    const companies = await this.findCompaniesUseCase.execute(query.filter);
    return companies.map((company) => CompanyResponseDto.fromDomain(company));
  }

  @Post()
  @ApiOperation({ summary: 'Registra una nueva empresa' })
  @ApiBody({ type: RegisterCompanyDto })
  @ApiResponse({ status: 200, description: 'Empresa creada' })
  @ApiResponse({ status: 400, description: 'Error de validación' })
  async upsert(@Body() payload: RegisterCompanyDto) {
    await this.registerCompanyUseCase.execute(payload);
    return { success: true };
  }
}
