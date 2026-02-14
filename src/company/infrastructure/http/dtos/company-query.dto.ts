import { IsEnum } from 'class-validator';
import { FilterType } from '../../../application/find-companies/filter-type';

export class CompanyQueryDto {
  @IsEnum(FilterType)
  filter!: FilterType;
}
