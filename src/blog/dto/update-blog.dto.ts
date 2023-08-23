import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageName?: string;
}
