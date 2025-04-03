import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateVisiMisiDto } from './create-visi-misi.dto';

export class UpdateVisiMisiDto extends PartialType(CreateVisiMisiDto) {
  @IsOptional()
  @IsString()
  visi?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  misi?: string[];
}
