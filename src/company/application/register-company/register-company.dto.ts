import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsUUID,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyType } from '../../domain/enums/company-type.enum';

export class RegisterCompanyDto {
  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ enum: CompanyType })
  @IsNotEmpty()
  @IsEnum(CompanyType)
  type!: CompanyType;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  adheredAt!: Date;
}
