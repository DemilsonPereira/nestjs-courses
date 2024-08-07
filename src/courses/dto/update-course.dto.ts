import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly description?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional()
  readonly tags?: string[];
}
