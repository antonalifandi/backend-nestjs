import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateVisiMisiDto {
  @IsString()
  @IsNotEmpty()
  visi: string;

  @IsArray()
  @IsString({ each: true })
  misi: string[]; 
}
