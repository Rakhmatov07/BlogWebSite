import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto'
import { IBlog } from 'src/models/blog.model';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { IRequest } from 'src/shared/types/request.type';

@UseGuards(AuthGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: IRequest) {
    return this.blogService.create(createBlogDto, req);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IBlog> {
    const blog = await this.blogService.findOne(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.blogService.update(id, updateBlogDto);

    if (updatedBlog) {
      return { message: 'Blog updated successfully', updatedBlog };
    } else {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {  
    return this.blogService.remove(id);
  }
}
