import { IsString, MinLength, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageName: string;
}
