import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @ApiProperty()
  readonly tags: string[];
}
